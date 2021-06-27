import { Spin, Select, TreeSelect} from 'antd';
import { SortDescendingOutlined, SortAscendingOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from './ProductsList';
import { getAllCategories } from '../../_actions/categoryActions';
import { getAllProducts } from '../../_actions/productActions';
import { getCategoriesHierarchy } from '../../SharedComponents/Categories/CategoriesFunctions';
import { useParams } from 'react-router-dom';
import {history} from '../../_helpers/history';
const { Option } = Select;
// const { TreeNode } = TreeSelect;

const Products = () => {
    const dispatch = useDispatch();
    const { category } = useParams();

    

    const categories = useSelector(state => state.categoryState.categories);
    const loadingCategory = useSelector(state => state.categoryState.loading);
    const errorCategory = useSelector(state => state.categoryState.error);
    const products = useSelector(state => state.productState.products);
    const loadingProduct = useSelector(state => state.productState.loading);
    const errorProduct = useSelector(state => state.productState.error);


    const [filteredAndSorted, setFilterAndSorted] = useState(products);
    const [filter, setFilter] = useState("allCategories");
    const [sorted, setSorted] = useState("priceAsc");
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);
    const loading = (loadingCategory || loadingProduct) ? true : false; // If either are loading, set loading to true, if not, set to false
    const error = (errorCategory || errorProduct) ? true : false; // If either are errorneous, set error to true, if not, set to false

    // function to generate the logic for sorting according to user input
    const sortProduct = (product, productToCompare, sortValue) => {
        switch (sortValue) {
            case "priceAsc":
                return (product.p_price < productToCompare.p_price ? -1 : 1);
            case "priceDesc":
                return (product.p_price < productToCompare.p_price ? 1 : -1);
            case "alphaDesc":
                return (product.p_name.toLowerCase() < productToCompare.p_name.toLowerCase() ? 1 : -1);
            case "alphaAsc":
                return (product.p_name.toLowerCase() < productToCompare.p_name.toLowerCase() ? -1 : 1);
            default:
                return 0;
        }
    }

    const filterAndSortProduct = () => {
        const parent = categories.find(c => {return c._id === filter});
        if(parent !== undefined && parent !== null){
            if(parent.path != null){
                setParent(parent.path.slice(1, parent.path.length -1));
                setChild(parent.c_name);
            }
            else{
                setParent(parent.c_name);
                setChild(null);
            }
        }
        else{
            setParent(null);
            setChild(null);
        } 

        const filterSortChildren = () => {
            const filteredSortedProducts = products
                .filter(e => { 
                    return (filter === "allCategories") ? true : e.p_categories === filter; 
                })
                .sort((a, b) => { 
                    return sortProduct(a, b, sorted); 
                });
            setFilterAndSorted(filteredSortedProducts);
        }

        if(parent !== undefined){
            if(parent.path === null){
                const children = categories.filter(c => {return c.path === `,${parent.c_name},`});

                const prods = products
                .filter(p => {
                    if(children.find(c => { return c._id === p.p_categories; }) === undefined) return false;
                    return true;
                })
                .sort((a, b) => { 
                    return sortProduct(a, b, sorted); 
                });
                setFilterAndSorted(prods);
            }
            else filterSortChildren();
        }
        else filterSortChildren();   
    };

    // For preloading data
    useEffect(() => {
        // if (!categories) 
            dispatch(getAllCategories());
        // if (!products) 
            dispatch(getAllProducts());
        if(category !== undefined){
            setFilter(category); 
            filterAndSortProduct()
        }

    }, [category]);

    // filter and sort product if product list changes
    useEffect(() => {
        filterAndSortProduct();
    }, [products, filter, sorted]);


    return (
      <>
        <div className="page-title-holder fill">
            <h2>Our product range</h2>
        </div>

        <div className="container flex-horizontal-box-container" style={{paddingBottom: "1%", cursor: "pointer"}}>
            <u>
                <span onClick={() => {
                    history.push('/');
                    window.location.reload();
                }}>/home</span>

                <span onClick={() => {
                    history.push('/products');
                    window.location.reload();
                }}>/products</span>
                
                {
                    parent
                    ?
                    <span onClick={() => {
                        var cat = categories.find(c => {return c.c_name === parent});
                        history.push(`/products/${cat._id}`);
                        setFilter(cat._id);
                    }}>/{parent}</span>
                    :
                    <></>
                }
                {
                    child
                    ?
                    <span>/{child}</span>
                    :
                    <></>
                }
            </u>
        </div>

            { error ? <div class="container"><h1 style={{ textAlign: 'center', color: 'red' }}>Could not load data, please try refreshing page!</h1></div> :
                (loading ? <div style={{textAlign: 'center'}}><Spin size="large"></Spin></div> : <>
                    <div className="container flex-horizontal-box-container">
                        
                        <TreeSelect 
                            className="box-item-xs-12 box-item-sm-6 box-item-md-4 box-item-lg-4 box-item-xl-3" 
                            treeData={getCategoriesHierarchy(categories, true)} 
                            placeholder="Filter Category" 
                            defaultValue="allCategories" 
                            treeDefaultExpandAll 
                            onChange={e => {
                           
                                
                         
                                setFilter(e); 
                                filterAndSortProduct()
                            }}
                        />

                        <Select 
                            className="box-item-xs-12 box-item-sm-6 box-item-md-4 box-item-lg-4 box-item-xl-3" 
                            defaultValue="priceAsc" 
                            onSelect={e => {
                                setSorted(e);
                                filterAndSortProduct()
                            }}
                        >
                            <Option value="noSort" disabled><SortAscendingOutlined />Sort By</Option>
                            <Option value="alphaAsc"><SortAscendingOutlined />Sort By: Alphabetically Ascending</Option>
                            <Option value="alphaDesc"><SortDescendingOutlined />Sort By: Alphabetically Descending</Option>
                            <Option value="priceAsc"><RiseOutlined />Sort By: Price Ascending</Option>
                            <Option value="priceDesc"><FallOutlined />Sort By: Price Descending</Option>
                        </Select>
                    </div>
                    <ProductsList key={filteredAndSorted} productDetails={filteredAndSorted} category={filter}/>
                </>)}
      </>
    );

}

export default Products;