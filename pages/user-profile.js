export default function UserProfilePage(props) {
	return <h1>{props.username}'s Profile</h1>;
}

export async function getServerSideProps(context) {
	// execute the query to get the user data from the database and return it as a prop called userData to the component

	const { params, req, res } = context;

	return {
		props: {
			username: "Yashi",
		},
	};
}
