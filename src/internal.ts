import { LoginRequest } from "@requests/login.request";
import { Contact } from "@entities/contact.types";
import { SendTextRequest } from "@requests/send-text.request";
import { SendMediaRequest } from "@requests/send-media.request";
import { SendActionCardRequest } from "@requests/send-action-card.request";
import { SendTemplateRequest } from "@requests/send-template.request";
import { CreateChatRequest } from "@requests/create-chat.request";
import { FinalizeChatRequest } from "@requests/finalize-chat.request";
import { Script } from "@entities/script.type";
import { CreateContactRequest } from "@requests/create-contact.request";
import { Context } from "./types/context.type";
import Premium from "./index";

export default class InternalWrapper {
	private readonly premium: Premium;

	constructor(public readonly context: Context) {
		this.premium = new Premium({
			channelId: context.channelId,
			domainUrl: context.apiUrl.slice(4)
		});
	}

	login(body: LoginRequest) {
		return this.premium.login(body);
	}

	getOrganizationContacts() {
		return this.premium.getOrganizationContacts();
	}

	getChannelTemplates() {
		return this.premium.getChannelTemplates();
	}

	getAllActionCards() {
		return this.premium.getAllActionCards();
	}

	getDefaultChatbotMenus() {
		return this.premium.getDefaultChatbotMenus();
	}

	getOrganizationTags() {
		return this.premium.getOrganizationTags();
	}

	getAllScripts() {
		return this.premium.getAllScripts();
	}

	isChannelConnected() {
		return this.premium.isChannelConnected();
	}

	isChannelValid() {
		return this.premium.isChannelValid();
	}

	sendText(body: SendTextRequest) {
		if (!body.number && !body.contactId) {
			body.contactId = this.context.contactId;
		}
		return this.premium.sendText(body);
	}

	sendMedia(body: SendMediaRequest) {
		if (!body.number && !body.contactId) {
			body.contactId = this.context.contactId;
		}
		return this.premium.sendMedia(body);
	}

	sendActionCard(body: SendActionCardRequest) {
		if (!body.number && !body.contactId) {
			body.contactId = this.context.contactId;
		}
		return this.premium.sendActionCard(body);
	}

	sendTemplate(body: SendTemplateRequest) {
		if (!body.number && !body.contactId) {
			body.contactId = this.context.contactId;
		}
		return this.premium.sendTemplate(body);
	}

	sendMenu(menuId: string, chatId?: string) {
		return this.premium.sendMenu(
			menuId,
			chatId || this.context.chatId || ""
		);
	}

	createChat(
		body: CreateChatRequest,
		ifAlreadyOpenedReturnId: boolean
	): Promise<string> {
		if (!body.number && !body.contactId) {
			body.contactId = this.context.contactId;
		}
		return this.premium.createChat(body, ifAlreadyOpenedReturnId);
	}

	finalizeChat(body: FinalizeChatRequest, chatId?: string) {
		return this.premium.finalizeChat(
			body,
			chatId || this.context.chatId || ""
		);
	}

	createScript(body: Script): Promise<string> {
		return this.premium.createScript(body);
	}

	updateScript(body: Script) {
		return this.premium.updateScript(body);
	}

	setScriptLock(scriptId: string, locked: boolean) {
		return this.premium.setScriptLock(scriptId, locked);
	}

	getContact() {
		return this.premium.getContactById(this.context.contactId || "");
	}

	getContactById(contactId: string) {
		return this.premium.getContactById(contactId);
	}

	getContactByNumber(number: string, retryWithNineSwitch: boolean = false) {
		return this.premium.getContactByNumber(number, retryWithNineSwitch);
	}

	createContact(body: CreateContactRequest): Promise<string> {
		return this.premium.createContact(body);
	}

	updateContact(body: Contact) {
		if (!body.id) body.id = this.context.contactId;
		return this.premium.updateContact(body);
	}
}
