import '../../_assets/CSS/pages/Homepage/CategoryList.css';

import Category from './Category';
import { getAllCategories } from '../../_actions/categoryActions';

import { useState, useEffect } from "react";
import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const itemsPerPage = 6;





const CategoryList = () => {
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);

    const categories = useSelector(state => state.categoryState.categories);
    const loading = useSelector(state => state.categoryState.loading);
    const error = useSelector(state => state.categoryState.error);

    const maxNumberOfPages = (Math.ceil(categories.length/itemsPerPage) - 1);

    const renderableArray = categories.slice( page * itemsPerPage,
        ((page + 1) * itemsPerPage) > categories.length ? categories.length : ((page + 1) * itemsPerPage));

    const rederableCats = renderableArray.map((c, i) => {
        return <div key={i}><Category {...c}/></div>
    });





    useEffect(() => {             
        if(!categories.length) dispatch(getAllCategories());
    }, [categories.length, dispatch]);

    const onChange = p => { setPage(p - 1) };





    return (
        <>
            {
                error 
                ?   <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> 
                :   <></>
            }
            {
                loading 
                ?   <Spin size='large'/> 
                :   <>
                        <div className="Category-List-Container">{rederableCats}</div>
                        <Pagination defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
                    </>  
            }  
        </>
    );
};

export default CategoryList;
