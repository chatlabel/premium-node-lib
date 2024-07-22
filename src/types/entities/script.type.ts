export type Script = {
	id?: string;
	name: string;
	script: string;
	console: boolean;
	urlWebhookCallback?: string;
	tokenExternalWebhook?: string;
	urlExternalWebhook?: string;
	locked?: boolean;
	events: Array<number>;
};
