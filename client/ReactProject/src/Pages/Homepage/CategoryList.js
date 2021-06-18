import Category from './Category';
import { getAllCategories } from '../../_actions/categoryActions';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { useState, useEffect } from "react";
import { Spin, Button, message, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import noImage from '../../_assets/Images/No_Image.jpg';
import { history } from '../../_helpers/history';

const CategoryList = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categoryState.categories);
    const loading = useSelector(state => state.categoryState.loading);
    const error = useSelector(state => state.categoryState.error);
    const emptyCategories = useSelector(state => state.categoryState.empty);
    const productsList = useSelector(state => state.productState.products);
   
    const [currentCategories, setCurrentCategories] = useState([]);
    const [isChild, setIsChild] = useState(false);
    const [parentCategoires, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [currerntCategory, setCurrentCategory] = useState(null);

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
                setCurrentCategory(cat);
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
        setCurrentCategory(null);
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


    return (
        <>
            {
                error 
                ?   <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> 
                :   <></>
            }
            {
                isChild ? <div className="container"><Button onClick={goBack}>Go back</Button></div> : <></>
            }
            {
                loading 
                ?   <div style={{textAlign: 'center'}}><Spin size='large'/> </div>
                :   <>
                        <div className="container">
                            <div style={{paddingBottom: "1%", cursor: "pointer"}}>
                                <u>
                                    <span onClick={() => window.location.reload()}>/home</span>
                                    {
                                        currerntCategory
                                        ?
                                        <span>/{currerntCategory.c_name}</span>
                                        :
                                        <></>
                                    }
                                </u>
                            </div>
                            <List
                                grid={{
                                    gutter: 6, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5
                                }}
                                pagination={{
                                    position: 'bottom',
                                    defaultPageSize: 8,
                                }}
                                dataSource={currentCategories}
                                renderItem={item => {
                                return(
                                    <List.Item>                        
                                        <Category {...item} onClick={ () => changeCategoryType(item)} image={getCategoryImage(item._id.toString())}/>
                                    </List.Item>
                                )}}
                            />
                        </div>
                    </>  
            }  
        </>
    );
};

export default CategoryList;
