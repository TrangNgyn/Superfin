import { Input, Button, Form, Tree, TreeSelect} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../_actions/categoryActions';
import { useEffect } from 'react';
import { confirmAddingCategory, confirmDeleteCategory } from './Helpers/Modals';
import { getCategoriesHierarchy } from '../../SharedComponents/Categories/CategoriesFunctions';
import { useAuth, useAuthUpdate } from '../../SharedComponents/AuthContext/AuthContext';

const { TextArea } = Input;

const ManageCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categoryState.categories);
    const [form_add_category] = Form.useForm();
    const [form_delete_category] = Form.useForm();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    const onSubmitAddCategoryForm = values => {
        confirmAddingCategory(values, form_add_category, auth.access_token, updateAuth);
    }
    const onSubmitDeleteCategoryForm = values => {
        confirmDeleteCategory(values, auth.access_token, updateAuth);
    }
    const createPathForCategory = (node) => {
        if(node === null){
            console.error("Invalid selection for parent node");
            return null;
        }
        if(node.path === null){
            return "," + node.c_name + ",";
        } else {
            if(node.value === 'root'){
                return null;
            } else {
                return node.path + node.c_name + ",";
            }
        }
    }


    useEffect(() => {             
        if(!categories.length) dispatch(getAllCategories())
    }, [categories.length, dispatch, categories]);

    return (
        <div>
            <div className="page-title-holder fill">
                <h2>Manage Categories</h2>
            </div>
            <div className="container flex-horizontal-box-container">
                <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6 box-item-xl-4 box-shadow" id="manage-categories-current-panel">
                    <h3>Current Categories</h3>
                    <Tree treeData={getCategoriesHierarchy(categories, false)} selectable={false}/>
                </div>
                <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6 box-item-xl-4 box-shadow" id="manage-categories-add-category-panel">
                    <h3>Add Category</h3>
                    <Form form={form_add_category} onFinish={onSubmitAddCategoryForm}
                      initialValues={{"categoryParentPath": 'root'}}>
                        <label htmlFor="categoryParentPath">Select parent category</label>
                        <Form.Item name="categoryParentPath"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a parent category!'
                                }
                            ]}>
                            {/* Input for Category Parent - for path*/}
                            <TreeSelect treeData={[{
                                title: '<No Parent> Root',
                                value: 'root',
                                children: getCategoriesHierarchy(categories, false)
                            }]} treeDefaultExpandAll placeholder="<No Parent> Root" onSelect={(values, node, extra) => { form_add_category.setFieldsValue({categoryParentPath: createPathForCategory(node)}) }}/>
                        </Form.Item>
                        <label htmlFor="categoryName">Enter category name</label>
                        <Form.Item name="categoryName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the new category\'s name!'
                                }
                            ]}>
                            <Input maxLength={30} placeholder="Type new category name here" />
                        </Form.Item>
                        <label htmlFor="categoryDescription">Enter category description</label>
                        <Form.Item name="categoryDescription" rules={[
                            {
                                required: true,
                                message: 'Please input the new category\'s description!'
                            }
                        ]}>
                            <TextArea rows={4} placeholder="Type new category description here" style={{resize: 'none'}}/>
                        </Form.Item>
                        <Form.Item>
                            <div>
                                <Button type="primary" htmlType='submit'>Add Category</Button>
                                &ensp;
                                <Button type="secondary" onClick={(e) => { form_add_category.setFieldsValue({ categoryParentPath: 'root', categoryName: undefined, categoryDescription: undefined }); }}>Clear Details</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-4 box-shadow" id="manage-categories-delete-category-panel">
                    <h3>Delete Category</h3>
                    <Form form={form_delete_category} onFinish={onSubmitDeleteCategoryForm}>
                        <label htmlFor="categoryToDelete">Select category to delete</label>
                        <Form.Item name="categoryToDelete"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a category!'
                                }
                            ]}>
                            <TreeSelect treeData={getCategoriesHierarchy(categories, false)} treeDefaultExpandAll placeholder="Please select a category to delete" onSelect={(values, node, extra) => { form_delete_category.setFieldsValue({ categoryToDelete: node.c_name})}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Delete Category</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div> 
        </div>
    );
}

export default ManageCategories;