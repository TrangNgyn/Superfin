import { Input, Button, Select } from 'antd';

const { Option } = Select;

const ManageCategories = () => {
    return (
        <div>
            <div id="manage-products-header">Manage Categories</div>
            <div style={{textAlign: "center"}}>
                <div>
                    <h3>Add Parent Category</h3>
                    <Input style={{width: "300px"}} placeholder="Type new parent category here"/>
                    <Button>Add</Button>
                </div>
                

                <div style={{paddingTop: "100px"}}>
                    <h3>Add Sub-Category</h3>
                    <Input style={{width: "300px"}} placeholder="Type new sub-category here"/>

                    <Select style={{ width: 300 }} placeholder="Select parent category">
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button>Add</Button>
                </div>

                <div style={{paddingTop: "100px"}}>
                    <h3>Delete Parent Category</h3>
                    <Select style={{ width: 300 }} placeholder="Select parent category">
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button>Delete</Button>
                </div>

                <div style={{paddingTop: "100px", paddingBottom: "100px"}}>
                    <h3>Delete Sub-Category</h3>
                    <Select style={{ width: 300 }} placeholder="Select parent category">
                        <Option value="lucy">Lucy</Option>
                    </Select>

                    <Select style={{ width: 300 }} placeholder="Select sub-category">
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button>Delete</Button>
                </div>
                
            </div>
        </div>
    );
}

export default ManageCategories;