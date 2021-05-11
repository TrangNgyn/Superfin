import { Spin, Select } from 'antd';
import { SortDescendingOutlined, SortAscendingOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from './ProductsList';
import { getAllCategories } from '../../_actions/categoryActions';
import { getAllProducts } from '../../_actions/productActions';
const { Option } = Select;

const Products = () => {
    const dispatch = useDispatch();
    const [filteredAndSorted, setFilterAndSorted] = useState(0);
    const [filter, setFilter] = useState(0);
    const [sorted, setSorted] = useState(0);
    const categories = useSelector(state => state.categoryState.categories);
    const loadingCategory = useSelector(state => state.categoryState.loading);
    const errorCategory = useSelector(state => state.categoryState.error);
    const products = useSelector(state => state.productState.products);
    const loadingProduct = useSelector(state => state.productState.loading);
    const errorProduct = useSelector(state => state.productState.error);

    const loading = (loadingCategory || loadingProduct) ? true : false; // If either are loading, set loading to true, if not, set to false
    const error = (errorCategory || errorProduct) ? true : false; // If either are errorneous, set error to true, if not, set to false

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

    const addSubCategories = (parents, categoriesList, indent) => {
        if (categoriesList == null) {
            console.error("Sorry, categories list is null!")
        } else {
            parents.forEach(parent => {
                parent.indent = indent;
                parent.children = [];
                var childrenList = null;
                childrenList = categoriesList.filter(category => category.path.includes(parent.c_name)); // Filter the children out of the list
                childrenList.forEach(child => {
                    categoriesList.splice(categoriesList.indexOf(child), 1); // Remove the children from the categories list
                    parent.children.push(child);
                });
                addSubCategories(parent.children, parent.children, indent + 1);
            });
        }
    }

    const getCategoriesHierarchy = (categories) => {
        var copyOfCategories = categories.map(x => x);
        const rootParents = copyOfCategories.filter(category => category.path == null);
        rootParents.forEach(parent => { copyOfCategories.splice(copyOfCategories.indexOf(parent), 1); });
        addSubCategories(rootParents, copyOfCategories, 0);
        var flattened = flattenHierarchy(rootParents);
        return flattened;
    }

    function flattenHierarchy(hierarchy) {
        var flat = [];
        hierarchy.forEach((node) => {
            flat.push({
                _id: node._id,
                c_name: node.c_name,
                indent: node.indent
            }); // Push the parent in first
            if(node.children.length != 0){
                // Recursively add everything by calling function on the children list if it's not null
                flat.push(flattenHierarchy(node.children));
            }
        });
        return flat.flat();
    }

    const filterAndSortProduct = () => {
        if (filter !== 0 && sorted !== 0) {
            const filteredSortedProducts = products.filter(e => { return (filter === "allCategories" || filter === 0) ? true : e.p_categories === filter; }).sort((a, b) => { return sortProduct(a, b, sorted); });
            setFilterAndSorted(filteredSortedProducts);
        }
    }

    // For preloading data
    useEffect(() => {
        if (!categories.length) dispatch(getAllCategories());
        if (!products.length) dispatch(getAllProducts());
        setFilter("allCategories");
        setSorted("priceAsc");
    }, []);

    useEffect(() => {
        filterAndSortProduct();
    },[products, filter, sorted]);

    return (
        <><div className="page-title-holder fill">
            <h2>Our product range</h2>
        </div>
            { error ? <div class="container"><h1 style={{ textAlign: 'center', color: 'red' }}>Could not load data, please try refreshing page!</h1></div> :
                (loading ? <Spin size='large' /> : <>
                    <div className="container flex-horizontal-box-container">
                        <Select className="box-item-xs-2 box-item-sm-3 box-item-md-3 box-item-lg-3 box-item-xl-4" defaultValue="allCategories" onSelect={e => { setFilter(e); }}>
                            <Option value="noCategory" disabled>Filter By Category</Option>
                            <Option value="allCategories" >All Category</Option>
                            {
                                // <Option value={category._id}>{spaces.join("") + category.c_name}</Option>
                                getCategoriesHierarchy(categories).map((category, index) => {
                                    return <Option key={index} value={category._id}>{new Array(category.indent).fill('\u2003').join('') + category.c_name}</Option>;
                                })
                            }

                        </Select>
                        <Select className="box-item-xs-2 box-item-sm-3 box-item-md-2 box-item-lg-3 box-item-xl-4" defaultValue="priceAsc" onSelect={e => { setSorted(e); }}>
                            <Option value="noSort" disabled><SortAscendingOutlined />Sort By</Option>
                            <Option value="alphaAsc"><SortAscendingOutlined />Sort By: Alphabetically Ascending</Option>
                            <Option value="alphaDesc"><SortDescendingOutlined />AscendingSort By: Alphabetically Descending</Option>
                            <Option value="priceAsc"><RiseOutlined />Sort By: Price Ascending</Option>
                            <Option value="priceDesc"><FallOutlined />Sort By: Price Descending</Option>
                        </Select>
                    </div>
                    <ProductsList {...filteredAndSorted} />
                </>)}
        </>
    );

}

export default Products;