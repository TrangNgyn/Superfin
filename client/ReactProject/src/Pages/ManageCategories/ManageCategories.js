import { Input, Button, Select, Form, Tree} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../_actions/categoryActions';
import { useEffect, useState } from 'react';
import { confirmChild, confirmParent, confirmDeleteParent, confirmDeleteChild } from './Helpers/Modals';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { getCategoriesHierarchy } from '../../SharedComponents/Categories/CategoriesFunctions';

const { Option } = Select;





const ManageCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categoryState.categories);
    const emptyCategories = useSelector(state => state.categoryState.empty);

    const [parentCategoires, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
 
    //for delete subcategory
    const [parent, setParent] = useState(null);
    const [children, setChildren] = useState([]);
  
    const [form_1] = Form.useForm();
    const [form_2] = Form.useForm();


    useEffect(() => {             
        if(!categories.length && !emptyCategories){
            dispatch(getAllCategories());
        } 
        else if(!parentCategoires.length && !childCategories.length){
            const parents = categories.filter(c => {
                return c.path === null;
            });
            setParentCategories(parents);

            const children = categories.filter(c => {
                return c.path !== null;
            });
            setChildCategories(children);
        }
        if(parent !== null){
            const childrenOfParent = childCategories.filter(c => {
                return c.path === `,${parent},`
            });
            setChildren(childrenOfParent);
        }
    }, [categories.length, dispatch, categories, parent, childCategories, emptyCategories, parentCategoires.length]);





    const onSubmitForm_1 = values => {
        confirmParent(values.category_name, form_1);
    }
    const onSubmitForm_2 = values => {
        confirmChild(values.category_name, values.parent_name, form_2);
    }
    const onSubmitForm_3 = values => {
        confirmDeleteParent(values.category_name);
    }
    const onSubmitForm_4 = values => {
        confirmDeleteChild(values.category_name);
    }





    const parentCatagoriesSelect = parentCategoires.map(c => {
        return <Option key={c._id} value={c.c_name}>{c.c_name}</Option>
    });

    const childrenOfParent = children.map(c => {
        return <Option key={c._id} value={c.c_name}>{c.c_name}</Option>
    });


    


    return (
        <div>
            <div className="page-title-holder fill">
                <h2>Manage Categories</h2>
            </div>
            <div className="container flex-horizontal-box-container">
                <div className="box-item-xs-1 box-item-sm-2 box-item-md-3 box-item-lg-3 box-item-xl-4 box-shadow" id="manage-categories-current-panel">
                    <h3>Current Categories</h3>
                    <Tree treeData={getCategoriesHierarchy(categories, false)}/>
                </div>
                <div className="box-item-xs-1 box-item-sm-2 box-item-md-3 box-item-lg-3 box-item-xl-4 box-shadow" id="manage-categories-add-parent-panel">
                    <h3>Add Parent Category</h3>
                    <Form form={form_1} onFinish={onSubmitForm_1}>
                        <Form.Item
                            name="category_name"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input a name for the parent category'
                                }
                            ]}
                        >
                            <Input maxLength={30} placeholder="Type new parent category here" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Add</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="box-item-xs-1 box-item-sm-2 box-item-md-3 box-item-lg-3 box-item-xl-4 box-shadow" id="manage-categories-add-sub-panel">
                    <h3>Add Sub-Category</h3>
                    <Form form={form_2} onFinish={onSubmitForm_2}>
                        <Form.Item
                            name="category_name"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input a name for the sub-category!'
                                }
                            ]}
                        >
                            <Input maxLength={30} placeholder="Type new sub-category here" />
                        </Form.Item>
                        <Form.Item
                            name="parent_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a parent for the sub-category!'
                                }
                            ]}
                        >
                            <Select placeholder="Select parent category">
                                {parentCatagoriesSelect}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Add</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="box-item-xs-1 box-item-sm-2 box-item-md-2 box-item-lg-2 box-item-xl-4 box-shadow" id="manage-categories-delete-parent-panel">
                    <h3>Delete Parent Category</h3>
                    <Form onFinish={onSubmitForm_3}>
                        <Form.Item
                            name="category_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a parent category!'
                                }
                            ]}
                        >
                            <Select placeholder="Select parent category">
                                {parentCatagoriesSelect}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Delete</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="box-item-xs-1 box-item-sm-1 box-item-md-2 box-item-lg-2 box-item-xl-4 box-shadow" id="manage-categories-delete-sub-panel">
                    <h3>Delete Sub-Category</h3>
                    <Form onFinish={onSubmitForm_4}>
                        <Form.Item
                            name="parent_category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a parent category!'
                                }
                            ]}
                        >
                            <Select placeholder="Select parent category" onSelect={v => { setParent(v) }}>
                                {parentCatagoriesSelect}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="category_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a sub-category!'
                                }
                            ]}>
                            <Select placeholder="Select sub-category">
                                {childrenOfParent}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Delete</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div> 
        </div>
    );
}

export default ManageCategories;