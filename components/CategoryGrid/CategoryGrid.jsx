import Category from '../Category';

import { itemContainer } from './styles.module.css';

export default function CategoryGrid({ data }) {
	return (
		<div className={itemContainer}>
			{data.categories.items.map((category, i) => {
				return <Category data={category} key={`category-${i}`}></Category>;
			})}
		</div>
	);
}
