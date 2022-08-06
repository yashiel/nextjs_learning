import React, { useEffect, useState } from "react";
import useSWR from "swr";

function lastSalesPage() {
	const [sales, setSales] = useState();
	// const [isLoading, setLoading] = useState(false);

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

	if (!data || !sales) {
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

export default lastSalesPage;
