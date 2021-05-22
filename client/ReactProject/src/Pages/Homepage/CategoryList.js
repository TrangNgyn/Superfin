import '../../_assets/CSS/pages/Homepage/CategoryList.css';
import Category from './Category';
import { getAllCategories } from '../../_actions/categoryActions';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { useState, useEffect } from "react";
import { Pagination, Spin, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import noImage from '../../_assets/Images/No_Image.jpg';
import { history } from '../../_helpers/history';

const itemsPerPage = 6;

const CategoryList = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categoryState.categories);
    const loading = useSelector(state => state.categoryState.loading);
    const error = useSelector(state => state.categoryState.error);
    const emptyCategories = useSelector(state => state.categoryState.empty);
    const productsList = useSelector(state => state.productState.products);
   

    const [page, setPage] = useState(0);
    const [currentCategories, setCurrentCategories] = useState([]);
    const [isChild, setIsChild] = useState(false);
    const [parentCategoires, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    
    console.log(productsList);

    const underConstructionMessage = () => {
        message.info({
          content: 'We are still adding products to this category. Check back soon!',
          style: {
            marginTop: '20vh',
            height: '40px'
          },
        });
      };




    
    const changeCategoryType = cat => {
        if(!isChild){
            
            const childrenOfParent = childCategories.filter(c => {
                return c.path === `,${cat.c_name},`
            });
            if(childrenOfParent.length === 0) underConstructionMessage();
            else{
                setCurrentCategories(childrenOfParent);
                setPage(0);
                setIsChild(true);
            }
        }
        else{
            const productFound = productsList.find(p => {return p.p_categories === cat._id});
            if(productFound === undefined) underConstructionMessage();
            else history.push(`/products/${cat._id}`);
        } 
    }

    const getCategoryImage = c_id => {
        let id = c_id;
        if(!isChild){
            const cat = categories.find(c => { return c._id === id });
            const child = categories.find(c => { return c.path === `,${cat.c_name},` });
            if(child === undefined) return noImage;
            id = child._id;
        }

        const product = productsList.find(p => { return p.p_categories === id });
        if(product !== undefined) return product.p_image_uri[0];
        else return noImage;
    }

    const goBack = () => {
        setIsChild(false);
        setCurrentCategories(parentCategoires);
        setPage(0);
    }

     useEffect(() => {    
        if(!productsList.length) dispatch(getAllProducts());      
        else dispatch(setDefaultOrder());

        if(!categories.length && !emptyCategories){
            dispatch(getAllCategories());
        } 
        else if(!parentCategoires.length && !childCategories.length){
            
            const parents = categories.filter(c => {
                return c.path === null;
            });
            setParentCategories(parents);
            setCurrentCategories(parents);

            const children = categories.filter(c => {
                return c.path !== null;
            });
            setChildCategories(children);
        }
    }, [categories.length, dispatch, categories, childCategories, emptyCategories, parentCategoires.length, productsList.length]);

    const onChange = p => { setPage(p - 1) };




    
    const maxNumberOfPages = (Math.ceil(currentCategories.length/itemsPerPage) - 1);
    
    const renderableArray = currentCategories.slice( page * itemsPerPage,
        ((page + 1) * itemsPerPage) > currentCategories.length ? currentCategories.length : ((page + 1) * itemsPerPage));

        
    const rederableCats = renderableArray.map((c, i) => {
        const img = getCategoryImage(c._id.toString());
        return <div key={i}><Category {...c} onClick={ () => changeCategoryType(c)} image={img}/></div>
    });





    return (
        <>
            {
                error 
                ?   <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> 
                :   <></>
            }
            {
                isChild ? <Button onClick={goBack}>Go back</Button> : <></>
            }
            {
                loading 
                ?   <Spin size='large'/> 
                :   <>
                        <div className="Category-List-Container">{rederableCats}</div>
                        <Pagination current={page + 1} defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
                    </>  
            }  
        </>
    );
};

export default CategoryList;
