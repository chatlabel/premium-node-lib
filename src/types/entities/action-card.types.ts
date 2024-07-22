export type ActionCard = {
	id: string;
	description: string;
	organizationId: string;
	canEdit: boolean;
	messages: Array<ActionCardMessage>;
	staticComponents: Array<TemplateComponent>;
	dynamicComponents: Array<TemplateComponent>;
};

export type ActionCardMessage = {
	id: string;
	typeMessage: number;
	typeFile: number;
	text: string;
	extension: string;
	file: string;
	order: number;
	scriptId: string;
	typeEvent: number;
};

export type TemplateComponent = {
	type: string;
	text: string;
	format: string;
	buttons: Array<{
		type: string;
		text: string;
		url: string;
		phone_number: string;
	}>;
};
