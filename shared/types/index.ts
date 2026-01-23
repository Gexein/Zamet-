export interface IDrawerState {
	isOpen: boolean;
	setIsOpen: (isOpen: IDrawerState["isOpen"]) => void;
	toggle: () => void;
}
