import axios from 'axios';
import { editSuccess, editFail } from './Modals';

export const setFormValues = (info, form) => {
    form.setFieldsValue({
        c_number: info.c_number,
        c_address: info.c_address,
        c_email: info.c_email,
        c_TandC: info.c_TandC,
        c_about: info.c_about,
        c_delivery: info.c_delivery,
        c_blog: info.c_blog
    });
}

export const postCompanyInfo = newInfo => {
    return axios.post('/api/aboutus/edit-info', newInfo)
        .then(res => {
            if(res.data.success)editSuccess();
            else{
                console.log(res);
                editFail();
            } 
        })
        .catch(err => {
            console.log(err);
            editFail();
        });
}