import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function lastSalesPage(props) {
	const [sales, setSales] = useState(props.sales);
	// const [isLoading, setIsLoading] = useState(false);

	const { data, error } = useSWR(
		"https://nextjs-course-64cee-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
		(url) => fetch(url).then((response) => response.json())
	);

	// useSWR return data needed to transform before setting state
	useEffect(() => {
		if (data) {
			const transformSales = [];
			for (const key in data) {
				transformSales.push({
					id: key,
					username: data[key].username,
					volume: data[key].volume,
				});
			}
			setSales(transformSales);
		}
	}, [data]);

	if (error) {
		return <div>Failed to load</div>;
	}

	if (!data && !sales) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</div>
	);
}

export async function getStaticProps() {
	const response = await fetch(
		"https://nextjs-course-64cee-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
	);
	const data = await response.json();
	const transformSales = [];
	for (const key in data) {
		transformSales.push({
			id: key,
			username: data[key].username,
			volume: data[key].volume,
		});
	}
	return {
		props: {
			sales: transformSales,
			revalidate: 10, // revalidate every minute (in seconds) to ensure the data is fresh and up to date from the server side cache (if any) and the local cache (if any) (default: 0)  (optional)
		},
	};
}