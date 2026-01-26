import { Link } from "expo-router";
import { ReactNode } from "react";

type TProps = {
	to: string;
	children: ReactNode;
};

export function Navigate({ to, children }: TProps) {
	return <Link href={`${to}`}>{children}</Link>;
}
