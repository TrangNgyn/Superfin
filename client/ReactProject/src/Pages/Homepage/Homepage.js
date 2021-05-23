import CategoryList from './CategoryList';
import { HomepageCarousel } from './HomepageCarousel';

export default function Homepage(){    
    return(
        <>
            <HomepageCarousel />
            <div className="page-title-holder">
                <h2>Show by Category</h2>
            </div>
            <CategoryList />
        </>
    );
}