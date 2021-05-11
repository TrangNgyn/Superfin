const addSubCategories = (parents, categoriesList) => {
    if (categoriesList == null) {
        console.error("Sorry, categories list is null!")
    } else {
        parents.forEach(parent => {
            parent.title = parent.c_name;
            parent.key = parent._id;
            parent.value = parent._id;
            parent.children = [];
            var childrenList = null;
            childrenList = categoriesList.filter(category => category.path.includes(parent.c_name)); // Filter the children out of the list
            childrenList.forEach(child => {
                categoriesList.splice(categoriesList.indexOf(child), 1); // Remove the children from the categories list
                parent.children.push(child);
            });
            addSubCategories(parent.children, parent.children);
        });
    }
}

export const getCategoriesHierarchy = (categories, insideAllCategories) => {
    var copyOfCategories = categories.map(x => x);
    const rootParents = copyOfCategories.filter(category => category.path == null);
    rootParents.forEach(parent => { copyOfCategories.splice(copyOfCategories.indexOf(parent), 1); });
    addSubCategories(rootParents, copyOfCategories);
    return (insideAllCategories ? ([{
        title: 'All Categories',
        value: 'allCategories',
        children: rootParents
    }]) : rootParents);
}