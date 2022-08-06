import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

export default function ProductDetailPage(props) {
	const { loadedProducts } = props;

	if (!loadedProducts) {
		return <div>Loading...</div>; // loading... prevents the page from rendering until the data is loaded
	}

	return (
		<Fragment>
			<h1>{loadedProducts.title}</h1>
			<p>{loadedProducts.description}</p>
		</Fragment>
	);
}

async function getData() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	return data;
}

export async function getStaticProps(context) {
	const { params } = context;
	const productId = params.pid;
	const data = await getData();

	const getProduct = data.products.find((product) => product.id === productId);

	if (!getProduct) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			loadedProducts: getProduct,
		},
	};
}

export async function getStaticPaths() {
	const data = await getData();
	// get all the product ids from the data
	const ids = data.products.map((product) => product.id);
	// create a path for each product id
	const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

	return {
		paths: pathsWithParams,
		fallback: false, // if no paths match, return 404 (optional)
	};
}
