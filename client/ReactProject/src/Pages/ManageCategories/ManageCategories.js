import { Input, Button, Select, Form} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../_actions/categoryActions';
import { useEffect, useState } from 'react';
import { confirmChild, confirmParent, confirmDeleteParent, confirmDeleteChild } from './Helpers/Modals';

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





    const parentCategoiresSelect = parentCategoires.map(c => {
        return <Option key={c._id} value={c.c_name}>{c.c_name}</Option>
    });

    const childrenOfParent = children.map(c => {
        return <Option key={c._id} value={c.c_name}>{c.c_name}</Option>
    });


    


    return (
        <div>
            <div id="manage-products-header">Manage Categories</div>
            <div style={{textAlign: "center"}}>
                <h3>Current Categories</h3>
                <div style={{paddingBottom: '100px'}}>
                    {
                        parentCategoires.map(c => {
                            return (
                                <div key={c._id}>
                                    <div style={{fontWeight: 'bold'}}>
                                        {c.c_name}
                                    </div>
                                    <div>
                                        {
                                            childCategories
                                            .filter(ch => { return ch.path === `,${c.c_name},`})
                                            .map(ch => {
                                                return <div key={ch._id}>{ch.c_name}</div>
                                            })
                                        }
                                    </div>
                                </div>
                            );  
                        })
                    }
                </div>
                <div>
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
                            <Input maxLength={30} style={{width: "300px"}} placeholder="Type new parent category here"/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Add</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{paddingTop: "100px"}}>
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
                            <Input maxLength={30} style={{width: "300px"}} placeholder="Type new sub-category here"/>
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
                            <Select style={{ width: 300 }} placeholder="Select parent category">
                                {parentCategoiresSelect}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit'>Add</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{paddingTop: "100px"}}>
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
                            <Select style={{ width: 300 }} placeholder="Select parent category">
                                {parentCategoiresSelect}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Delete</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{paddingTop: "100px", paddingBottom: "100px"}}>
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
                            <Select style={{ width: 300 }} placeholder="Select parent category" onSelect={v => {setParent(v)}}>
                                {parentCategoiresSelect}
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
                            <Select style={{ width: 300 }} placeholder="Select sub-category">
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