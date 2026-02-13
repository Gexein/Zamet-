import { EntryStorage } from "../storage";

export interface IEntry {
	id: number;
	category_sub_id: number;
	name: string;
	description: string;
	date?: string;
	created_at: string;
	updated_at: string;
}

export interface IEntryState {
	entries: IEntry[];
	currentEntry: IEntry | null;
	isLoading: boolean;
	isInitialized: boolean;
	storage: EntryStorage;
	initialize: (categorySubId: number) => Promise<void>;
	loadEntries: (categorySubId: number) => Promise<void>;
	createEntry: (
		categorySubId: number,
		name?: IEntry["name"],
		description: IEntry["description"],
		date?: IEntry["date"]
	) => Promise<IEntry>;
	updateEntryName: (
		id: number,
		categorySubId: number,
		name: IEntry["name"]
	) => Promise<void>;
	updateEntryDescription: (
		id: number,
		categorySubId: number,
		description: IEntry["description"]
	) => Promise<void>;
	updateEntryDate: (
		id: number,
		categorySubId: number,
		date?: IEntry["date"]
	) => Promise<void>;

	deleteEntry: (id: number, categorySubId: number) => Promise<void>;
	setCurrentEntry: (entry: IEntry | null) => void;
}
