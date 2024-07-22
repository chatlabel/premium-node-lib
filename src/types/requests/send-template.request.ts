export type SendTemplateRequest = {
	number?: string;
	contactId?: string;
	templateId: string;
	templateComponents?: Array<SendTemplateComponent>;
	forceSend: boolean;
	verifyContact: boolean;
};

export type SendTemplateComponent = {
	type: string;
	sub_type?: string;
	parameters: Array<{
		type: string;
		image?: {
			link: string;
		};
		video?: {
			link: string;
		};
		document?: {
			link: string;
		};
		currency?: {
			fallback_value: string;
			code: string;
			amount_1000: string;
		};
		date_time?: {
			fallback_value: string;
		};
		text?: string;
	}>;
	index?: number;
};
