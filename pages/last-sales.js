import React, { useEffect, useState } from "react";

function lastSalesPage() {
	const [sales, setSales] = useState();
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(
			`https://nextjs-course-64cee-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`
		)
			.then((res) => res.json())
			.then((data) => {
				const transformSales = [];
				for (const key in data) {
					transformSales.push({
						id: key,
						username: data[key].username,
						volume: data[key].volume,
					});
				}

				setSales(transformSales);
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return <div>Loading sales</div>;
	}

	if (!sales) {
		return <div>No sales</div>;
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
