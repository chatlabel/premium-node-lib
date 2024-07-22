import { Module } from "@entities/module.type";
import { Organization, Sector } from "@entities/organization.types";
import { Channel } from "@entities/channel.type";

export type LoginResponse = {
	id: string;
	utcDateRegister: Date;
	email: string;
	name: string;
	nickName: string;
	status: string;
	urlImage: string;
	isAdmin: boolean;
	utcDateLastActivity: Date;
	systemKey: string;
	activeSubscription: boolean;
	systemBlocked: boolean;
	limitDateReleased: Date;
	qtdUsersPlan: number;
	qtdeChannelsPlan: number;
	modules: Array<Module>;
	currentQtdeUsers: number;
	currentQtdeChannels: number;
	sectors: Array<Sector>;
	organizations: Array<Organization>;
	channels: Array<Channel>;
};
