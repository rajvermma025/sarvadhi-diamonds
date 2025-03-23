import { NavLink } from "react-router";
import { BrokerIcon, DiamondIcon, SiteIcon, TransectionIcon } from "../../assets";
import { APP_ROUTE } from "../../Constants/AppRoutes";

const Navbar = () => {
	const menuItems = [
		{ path: APP_ROUTE.BROKERS, label: "Broker Details", icon: BrokerIcon },
		{ path: APP_ROUTE.DIAMONDS, label: "Diamond Details", icon: DiamondIcon },
		{ path: APP_ROUTE.TRANSECTIONS, label: "Transaction Module", icon: TransectionIcon },
	];

	return (
		<div className="h-15 flex gap-6 shadow-navbar sticky top-0 left-0 bg-white z-2">
			<div className="ps-5 my-auto">
				<SiteIcon />
			</div>
			<div className="h-full p-2.5">
				<div className="shadow-navbar w-0.25 h-full bg-box"></div>
			</div>
			<div className="flex gap-5">
				{menuItems.map(({ path, label, icon: Icon }) => (
					<li key={label} className="flex justify-start">
						<NavLink
							to={path}
							className={({ isActive }) =>
								(isActive ? "text-primary font-semibold border-b-2 border-[#2A67B2]" : "text-secondary font-medium") +
								" flex items-center gap-2 font-poppins text-base"
							}
						>
							{({ isActive }) => (
								<>
									<Icon className={isActive ? "fill-primary" : "fill-secondary"} />
									<span>{label}</span>
								</>
							)}
						</NavLink>
					</li>
				))}
			</div>
		</div>
	);
};

export default Navbar;
