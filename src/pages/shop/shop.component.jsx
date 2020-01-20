import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { selectCollections } from '../../redux/shop/shop.selectors';

const ShopPage = ({ collections }) => (
	<div className='shop-page'>
		<CollectionOverview />
	</div>
);

export default ShopPage;
