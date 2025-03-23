import { useNavigate } from "react-router";
import { useCallback } from "react";

const useRedirect = () => {
	const navigate = useNavigate();

	const redirectTo = useCallback(
		(url: string) => {
			navigate(url);
		},
		[navigate]
	);

	return redirectTo;
};

export default useRedirect;
