export const getCategoryName = (id, categories) => {
    const category = categories.find(category => {
        return category._id === id;
    });
    
    if(category === undefined) return "Category Not Found"
    else return category.c_name;    
}