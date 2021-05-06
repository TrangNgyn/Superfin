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
        switch(sortValue) {
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

    const addSubCategory = (categories, category_to_add) => {
        var path_in_child = category_to_add.path.split(",").filter(Boolean);
        if(path_in_child.length === 0){
            console.error("Is this a parent category? Details: ");
            console.error(category_to_add);
        } else {
            if(path_in_child.length === 1){ // Base condition
                categories.forEach((parent_category, index) => {
                    if(parent_category.c_name === path_in_child[0]){
                        categories[index].children.push({
                            _id: category_to_add._id,
                            c_name: category_to_add.c_name,
                            c_description: category_to_add.c_description,
                            children: [],
                            indents: parent_category.indents + 1
                        });
                    }
                });
            } else {
                var currentParent = path_in_child.shift(); // Start from the first parent (left to right)
                categories.forEach((parent_category, index) => { // Access the children
                    if(parent_category.c_name === currentParent){
                        category_to_add.path = path_in_child.join(",")
                        addSubCategory(categories[index].children, category_to_add);
                    }
                });
            }
        }
    }

    const getCategoriesHierarchy = () => {
        var categories = [
            {
                path: null,
                _id: "608bb2dc346a8e03dd5ce0a6",
                c_name: "Paper bags",
                c_description: "Paper bags"
            },
            {
                path: null,
                _id: "608bb30a346a8e03dd5ce0a8",
                c_name: "Custom Printing",
                c_description: "Custom Printing"
            },
            {
                path: ",Custom Printing,",
                _id: "608bbb2d346a8e03dd5ce0b1",
                c_name: "Cups",
                c_description: "Cups"
            },
            {
                path: ",Custom Printing,Bags,",
                _id: "608d0a14ce6c9b1adbba60e3",
                c_name: "Tote",
                c_description: "All Totes"
            },
            {
                path: ",Custom Printing,Bags,Tote,",
                _id: "608d0a14ce6c9b1adbba60e3",
                c_name: "Red",
                c_description: "Red Tote"
            },
            {
                path: ",Paper bags,",
                _id: "608bbca1346a8e03dd5ce0b2",
                c_name: "Brown",
                c_description: "Brown"
            },
            {
                path: ",Paper bags,",
                _id: "608bbe9c346a8e03dd5ce0b3",
                c_name: "White",
                c_description: "White"
            },
            {
                path: ",Custom Printing,",
                _id: "608d0a14ce6c9b1adbba60e3",
                c_name: "Bags",
                c_description: "Bags"
            }
        ];
        var categories_hiearchy = [];
        var sorted = categories.sort((el1, el2) => {
            if((el1.path == null || el2.path == null) || ((el1.path != null && el2.path != null) && (el1.path.split(",").length < el2.path.split(",").length))) return -1;
            if(((el1.path != null && el2.path != null) && (el1.path.split(",").length > el2.path.split(",").length))) return 1;
            return 0;
        });
        sorted.forEach(category => {
            if(category.path == null){ // For Root Parent
                var category_obj = {
                    _id: category._id,
                    c_name: category.c_name,
                    c_description: category.c_description,
                    children: [],
                    indents: 0
                }
                categories_hiearchy.push(category_obj);
            } else {
                addSubCategory(categories_hiearchy, category)
            }
        });
        return categories_hiearchy;
    }

    const createCategorySelectArray = (category, reactElementList=[]) => {
        if(category.children == null) {
            console.error("Sorry but children cannot be null!");
        }
        if(category.children != null) {
            var spaces = new Array(category.indents);
            spaces.fill("&emsp;");
            reactElementList.push(<Option value={category._id}>{spaces.join("") + category.c_name}</Option>); // Add the parent first
            // Now add the children
            if(category.children.length != 0){
                category.children.forEach(child => {
                    createCategorySelectArray(child, reactElementList);
                });
            }
        }
        return (reactElementList);
    }

    // For preloading data
    useEffect(() => {
        if (!categories.length) dispatch(getAllCategories());
        if (!products.length) dispatch(getAllProducts());
        setFilter("allCategories");
        setSorted("priceAsc");
    }, [dispatch]);

    // For handling filtering and sorting
    useEffect(() => {
        const filterProduct = (product) => {
            return (filter === "allCategories" || filter === 0) ? true : product.p_categories === filter;
        }

        if(filter !== 0 && sorted !== 0){
            const filteredSortedProducts = products.filter(e => { return filterProduct(e); }).sort((a, b) => { return sortProduct(a, b, sorted); });
            setFilterAndSorted(filteredSortedProducts);
        }
            
    }, [filter, sorted, products, setFilterAndSorted]);

    return (
            <><div className="page-title-holder fill">
                <h2>Our product range</h2>
            </div>
            { error ? <div class="container"><h1 style={{ textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page!</h1></div> :
            (loading ? <Spin size='large' /> : <>
                <div className="container flex-horizontal-box-container">
                    <Select className="box-item-xs-2 box-item-sm-3 box-item-md-3 box-item-lg-3 box-item-xl-4" defaultValue="allCategories" onChange={e => { setFilter(e); }}>
                        <Option value="noCategory" disabled>Filter By Category</Option>
                        <Option value="allCategories" >All Category</Option>
                        {
                            getCategoriesHierarchy().map((category, index) => {
                                createCategorySelectArray(category).forEach(element =>{
                                    console.log(element);
                                    return element;
                                });
                            })
                        }

                    </Select>
                        <Select className="box-item-xs-2 box-item-sm-3 box-item-md-2 box-item-lg-3 box-item-xl-4" defaultValue="priceAsc" onChange={e => { setSorted(e); }}>
                        <Option value="noSort" disabled><SortAscendingOutlined />Sort By</Option>
                        <Option value="alphaAsc"><SortAscendingOutlined />Sort By: Alphabetically Ascending</Option>
                        <Option value="alphaDesc"><SortDescendingOutlined />AscendingSort By: Alphabetically Descending</Option>
                        <Option value="priceAsc"><RiseOutlined />Sort By: Price Ascending</Option>
                        <Option value="priceDesc"><FallOutlined />Sort By: Price Descending</Option>
                    </Select>
                </div>
                <ProductsList {...filteredAndSorted}/>
            </>)}
        </>
    );

}

export default Products;