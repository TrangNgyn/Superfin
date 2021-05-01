import axios from 'axios';
import { errorModal, successModal } from './Modals';

const addCategoryURL = 'api/categories/add-category';
const deleteCategoryURL = 'api/categories/?c_name=';

export const addParent = (c_name, form) => {
    const category = {
        c_name: c_name,
        c_description: c_name
    }
    
    return axios.post(addCategoryURL, category)
    .then(res => {
        if(res.data.success){
            successModal(`Added parent category "${category.c_name}" successfully.`);
        }
        else{
            console.log(res);
            form.setFields([
                {
                    name: "category_name",
                    errors: ['Category name already taken!'],
                }
            ]);
        }
    })
    .catch(err => {
        console.log(err);
        errorModal();
    })
}

export const addChild = (c_name, parent, form) => {
    const category = {
        c_name: c_name,
        c_description: c_name,
        path: `,${parent},`
    }

    return axios.post(addCategoryURL, category)
    .then(res => {
        if(res.data.success){
            successModal(`Added sub-category "${category.c_name}" successfully under parent category "${parent}".`);
        }
        else{
            console.log(res);
            form.setFields([
                {
                    name: "category_name",
                    errors: ['Category name already taken!'],
                }
            ]);
        }
    })
    .catch(err => {
        console.log(err);
        errorModal();
    })    
}

export const deleteParent = c_name => {
    return axios.delete(deleteCategoryURL + c_name)
    .then(res => {
        if(res.data.success){
            successModal(`Deleted parent category "${c_name}" from the database.`);    
        }
        else{
            console.log(res);
            errorModal();
        }
    })
    .catch(err => {
        console.log(err);
        errorModal();
    });
}

export const deleteChild = c_name => {
    return axios.delete(deleteCategoryURL + c_name)
    .then(res => {
        if(res.data.success){
            successModal(`Deleted sub-category "${c_name}" from the database.`);    
        }
        else{
            console.log(res);
            errorModal();
        }
    })
    .catch(err => {
        console.log(err);
        errorModal();
    });
}

