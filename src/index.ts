import axios, { AxiosInstance, isAxiosError } from "axios";
import { LoginRequest } from "@requests/login.request";
import { LoginResponse } from "@responses/login.response";
import { Contact } from "@entities/contact.types";
import { Menu } from "@entities/menu.type";
import { ChannelStatusResponse } from "@responses/channel-status.response";
import { SendTextRequest } from "@requests/send-text.request";
import { SendMessageResponse } from "@responses/send-message.response";
import { SendMediaRequest } from "@requests/send-media.request";
import { SimpleSuccessResponse } from "@responses/simple-success.response";
import { SendActionCardRequest } from "@requests/send-action-card.request";
import { SendTemplateRequest } from "@requests/send-template.request";
import { CreateChatRequest } from "@requests/create-chat.request";
import { CreateChatResponse } from "@responses/create-chat.response";
import { FinalizeChatRequest } from "@requests/finalize-chat.request";
import { Script } from "@entities/script.type";
import { ActionCard } from "@entities/action-card.types";
import { Tag } from "@entities/organization.types";
import { CreateContactRequest } from "@requests/create-contact.request";
import { Channel } from "@entities/channel.type";
import { isBrazilian, replaceNine } from "@utils/number";

export default class Premium {
	private static defaultDomain = "appchat.app";
	private readonly instance: AxiosInstance;
	private readonly domainUrl: string;
	private readonly channelId?: string;

	constructor(options: { channelId?: string; domainUrl?: string }) {
		this.domainUrl = options?.domainUrl || Premium.defaultDomain;
		this.channelId = options?.channelId;
		this.instance = axios.create({
			baseURL: `https://api.${this.domainUrl}/core/v2/api`,
			headers: {
				"Content-Type": "application/json",
				"access-token": this.channelId
			}
		});
	}

	async login(body: LoginRequest) {
		const { data } = await this.instance.post<LoginResponse>(
			"/users/login",
			body
		);
		return data;
	}

	async getOrganizationContacts() {
		const { data } = await this.instance.get<Array<Contact>>("/contacts");
		return data;
	}

	async getChannelTemplates() {
		const { data } = await this.instance.get<Array<ActionCard>>(
			"/action-cards/templates"
		);
		return data;
	}

	async getAllActionCards() {
		const { data } =
			await this.instance.get<Array<ActionCard>>("/action-cards");
		return data;
	}

	async getDefaultChatbotMenus() {
		const { data } = await this.instance.get<Array<Menu>>("/menus");
		return data;
	}

	async getOrganizationTags() {
		const { data } = await this.instance.get<Array<Tag>>("/tags");
		return data;
	}

	async getAllScripts() {
		const { data } = await this.instance.get<Array<Script>>("/scripts");
		return data;
	}

	async isChannelConnected() {
		const { data } =
			await this.instance.get<ChannelStatusResponse>("/channel/status");
		return data.status === "CONNECTED" || data.status === "REGISTERED";
	}

	async isChannelValid() {
		try {
			const { data } = await this.instance.get<Channel>("/channel");
			return data?.id === this.channelId;
		} catch {
			return false;
		}
	}

	async sendText(body: SendTextRequest) {
		const { data } = await this.instance.post<SendMessageResponse>(
			"/chats/send-text",
			body
		);
		return data;
	}

	async sendMedia(body: SendMediaRequest) {
		const { data } = await this.instance.post<SendMessageResponse>(
			"/chats/send-media",
			body
		);
		return data;
	}

	async sendActionCard(body: SendActionCardRequest) {
		const { data } = await this.instance.post<SendMessageResponse>(
			"/chats/send-action-card",
			body
		);
		return data;
	}

	async sendTemplate(body: SendTemplateRequest) {
		const { data } = await this.instance.post<SendMessageResponse>(
			"/chats/send-template",
			body
		);
		return data;
	}

	async sendMenu(menuId: string, chatId: string) {
		const { data } = await this.instance.post<SimpleSuccessResponse>(
			`/chats/${chatId}/send-menu?menuId=${menuId}`
		);
		return data;
	}

	async createChat(
		body: CreateChatRequest,
		ifAlreadyOpenedReturnId: boolean
	): Promise<string> {
		try {
			const { data } = await this.instance.post<CreateChatResponse>(
				"/chats/create-new",
				body
			);
			return data.chatId;
		} catch (e) {
			if (
				!ifAlreadyOpenedReturnId ||
				!isAxiosError(e) ||
				!e.response?.data.currentChatId
			)
				throw e;
			return e.response.data.currentChatId;
		}
	}

	async finalizeChat(body: FinalizeChatRequest, chatId: string) {
		const { data } = await this.instance.post<SimpleSuccessResponse>(
			`/chats/${chatId}/finalize`,
			body
		);
		return data;
	}

	async createScript(body: Script): Promise<string> {
		const response = await this.instance.post("/scripts", body);
		return response.headers.location.split("/").slice(-1)[0];
	}

	async updateScript(body: Script) {
		const { data } = await this.instance.put<SimpleSuccessResponse>(
			`/scripts/${body.id}`,
			body
		);
		return data;
	}

	async setScriptLock(scriptId: string, locked: boolean) {
		const { data } = await this.instance.post<SimpleSuccessResponse>(
			`/scripts/${scriptId}/set-lock?locked=${locked.toString()}`
		);
		return data;
	}

	async getContactById(contactId: string) {
		const { data } = await this.instance.get<Contact>(
			`/contacts/${contactId}`
		);
		return data;
	}

	async getContactByNumber(
		number: string,
		retryWithNineSwitch: boolean = false
	) {
		try {
			const { data } = await this.instance.get<Contact>(
				`/contacts/number/${number}`
			);
			return data;
		} catch (e) {
			if (
				!retryWithNineSwitch ||
				!isAxiosError(e) ||
				!isBrazilian(number)
			)
				throw e;
			return this.getContactByNumber(replaceNine(number));
		}
	}

	async createContact(body: CreateContactRequest): Promise<string> {
		const result = await this.instance.post("/contacts", body);
		return result.headers.location.split("/").slice(-1)[0];
	}

	async updateContact(body: Contact) {
		const { data } = await this.instance.put<SimpleSuccessResponse>(
			`/contacts/${body.id}`,
			body
		);
		return data;
	}
}
