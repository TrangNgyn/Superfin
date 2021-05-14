import axios from 'axios';
import { errorModal, successModal } from './Modals';

const addCategoryURL = 'api/categories/add-category';
const deleteCategoryURL = 'api/categories/?c_name=';

export const addCategory = (values, form) => {
    const newCategory = {
        path: (values.categoryParentPath === 'root' ? null : values.categoryParentPath),
        c_name: values.categoryName,
        c_description: values.categoryDescription
    }
    
    return axios.post(addCategoryURL, newCategory)
    .then(res => {
        if(res.data.success){
            successModal(`Added parent category "${newCategory.c_name}" successfully.`);
        }
        else{
            console.error("Sorry but the following error occured when adding new category[" + newCategory.c_name + "]: ")
            console.error(res);
            form.setFields([
                {
                    name: "categoryName",
                    errors: ['Category name already taken!'],
                }
            ]);
        }
    })
    .catch(err => {
        console.error(err);
        errorModal();
    })
}

export const deleteCategory = c_name => {
    return axios.delete(deleteCategoryURL + encodeURI(c_name))
        .then(res => {
            if (res.data.success) {
                successModal(`Deleted category [${c_name}] from the database!`);
            }
            else {
                console.error("Sorry but the following error occured when deleting the category[" + c_name + "]: ")
                console.error(res);
                errorModal();
            }
        })
        .catch(err => {
            console.error(err);
            errorModal();
        });
}