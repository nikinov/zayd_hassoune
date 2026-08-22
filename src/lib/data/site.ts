export const site = {
	name: 'Zayd Hassoune',
	initials: 'ZH',
	tagline: 'Private Yachting Advisory',
	description: 'Private yachting advisory in Monaco, with selective strategic introductions.',
	email: 'contact@zaydhassoune.com',
	phone: '+33 6 61 64 95 91',
	phoneHref: '+33661649591',
	location: 'Monaco',
	region: 'Monaco · Europe · Middle East'
};

export const nav = [
	{ href: '#yachting', label: 'Yachting' },
	{ href: '#capital', label: 'Strategic Connections' },
	{ href: '#process', label: 'Process' },
	{ href: '#about', label: 'About' }
];

export const verticals = [
	{
		id: 'yachting',
		number: '01',
		eyebrow: 'Yachting',
		title: 'Advisory for acquisition, sale and charter.',
		body: 'Tailored support for clients seeking access to the right yacht, trusted market intelligence and discreet representation throughout every stage of a transaction.',
		points: [
			'Yacht acquisition and sale',
			'Private and off-market opportunities',
			'Charter and destination planning',
			'Owner representation and strategic support'
		],
		cta: 'Discuss a yachting project'
	},
	{
		id: 'capital',
		number: '02',
		eyebrow: 'Strategic Connections',
		title: 'A complementary network for selected opportunities.',
		body: 'Alongside the core yachting activity, selected companies and entrepreneurs may be introduced to investors, family offices and strategic decision-makers when there is a genuine fit.',
		points: [
			'Selective capital introductions',
			'Family office and investor access',
			'Strategic business connections',
			'Cross-border opportunities'
		],
		cta: 'Discuss an opportunity'
	}
];

/** The five-step engagement from zaydhassoune.com. */
export const process = [
	{
		number: '01',
		title: 'Private Consultation',
		body: 'A confidential discussion to define objectives, timelines and acquisition parameters.'
	},
	{
		number: '02',
		title: 'Curated Yacht Access',
		body: 'Exclusive off-market and international listings sourced through established networks.'
	},
	{
		number: '03',
		title: 'Due Diligence & Inspection',
		body: 'Technical, legal and financial oversight coordinated with trusted specialists.'
	},
	{
		number: '04',
		title: 'Negotiation & Execution',
		body: 'Securing terms, managing contracts and protecting your position through closing.'
	},
	{
		number: '05',
		title: 'Charter & Investment Strategy',
		body: 'Charter optimisation, ongoing management and resale positioning after delivery.'
	}
];

export const principles = [
	{
		number: '01',
		title: 'Selective',
		body: 'Only opportunities with clear relevance and credible counterparties.'
	},
	{
		number: '02',
		title: 'Discreet',
		body: 'Confidentiality and relationship protection at every stage.'
	},
	{
		number: '03',
		title: 'International',
		body: 'Active across Monaco, Europe and the Gulf region.'
	}
];

export const interestOptions = [
	{ value: 'yachting', label: 'Yachting enquiry' },
	{ value: 'strategic', label: 'Strategic connections' },
	{ value: 'general', label: 'General enquiry' }
];

export const yachtingServices = [
	{ value: 'charter', label: 'Chartering a yacht' },
	{ value: 'sell', label: 'Selling my yacht' },
	{ value: 'buy', label: 'Buying a yacht' }
];

export type QuestionnaireField = {
	name: string;
	label: string;
	type: 'text' | 'number' | 'select' | 'textarea';
	placeholder?: string;
	options?: string[];
	full?: boolean;
	optional?: boolean;
	min?: number;
	max?: number;
};

export type Questionnaire = {
	eyebrow: string;
	title: string;
	fields: QuestionnaireField[];
};

export const questionnaires: Record<string, Questionnaire> = {
	charter: {
		eyebrow: 'Charter enquiry',
		title: 'Tell us about your ideal charter.',
		fields: [
			{
				name: 'charter_destination',
				label: 'Preferred destination or cruising area',
				type: 'text',
				placeholder: 'Monaco, South of France, Greece...'
			},
			{
				name: 'charter_dates',
				label: 'Preferred dates',
				type: 'text',
				placeholder: 'Exact dates or flexible period'
			},
			{
				name: 'charter_duration',
				label: 'Duration of the charter',
				type: 'text',
				placeholder: 'Day charter, weekend, one week...'
			},
			{
				name: 'charter_guests',
				label: 'Number of guests',
				type: 'number',
				min: 1,
				placeholder: 'Adults and children'
			},
			{
				name: 'charter_budget',
				label: 'Approximate budget',
				type: 'text',
				placeholder: 'Budget range in EUR'
			},
			{
				name: 'charter_preferences',
				label: 'Main preferences',
				type: 'text',
				placeholder: 'Style, size, cabins, water toys, itinerary...'
			},
			{
				name: 'charter_comments',
				label: 'Additional comments',
				type: 'textarea',
				full: true,
				optional: true,
				placeholder: 'Share any special requests, celebration details or itinerary ideas.'
			}
		]
	},
	sell: {
		eyebrow: 'Yacht sale',
		title: 'Tell us about your yacht.',
		fields: [
			{
				name: 'sell_builder',
				label: 'Builder and model',
				type: 'text',
				placeholder: 'For example: Benetti 40M'
			},
			{ name: 'sell_year', label: 'Year of build', type: 'number', min: 1900, max: 2100 },
			{ name: 'sell_length', label: 'Length', type: 'text', placeholder: 'Metres or feet' },
			{
				name: 'sell_location',
				label: 'Current location',
				type: 'text',
				placeholder: 'Port and country'
			},
			{
				name: 'sell_condition',
				label: 'Condition and recent refit',
				type: 'text',
				placeholder: 'Main works, upgrades or refit year'
			},
			{
				name: 'sell_price',
				label: 'Expected asking price',
				type: 'text',
				placeholder: 'Approximate price in EUR'
			},
			{
				name: 'sell_ownership',
				label: 'Ownership and VAT status',
				type: 'text',
				placeholder: 'Private/company owned, VAT paid or not'
			},
			{
				name: 'sell_timeline',
				label: 'Preferred sale timeline',
				type: 'text',
				placeholder: 'As soon as possible, this season...'
			},
			{
				name: 'sell_comments',
				label: 'Additional comments',
				type: 'textarea',
				full: true,
				optional: true,
				placeholder: 'Please add any relevant technical, commercial or confidential information.'
			}
		]
	},
	buy: {
		eyebrow: 'Yacht acquisition',
		title: 'Tell us what you are looking for.',
		fields: [
			{ name: 'buy_budget', label: 'Budget range', type: 'text', placeholder: 'Budget in EUR' },
			{
				name: 'buy_size',
				label: 'Preferred size',
				type: 'text',
				placeholder: 'Length range in metres or feet'
			},
			{
				name: 'buy_type',
				label: 'Preferred yacht type',
				type: 'text',
				placeholder: 'Motor yacht, explorer, sailing yacht...'
			},
			{
				name: 'buy_build',
				label: 'New build or pre-owned',
				type: 'select',
				options: ['Pre-owned', 'New build', 'Open to both']
			},
			{
				name: 'buy_guests',
				label: 'Required guest capacity',
				type: 'text',
				placeholder: 'Number of guests and cabins'
			},
			{
				name: 'buy_use',
				label: 'Main intended use',
				type: 'text',
				placeholder: 'Private use, charter, long-range cruising...'
			},
			{
				name: 'buy_location',
				label: 'Preferred location or delivery area',
				type: 'text',
				placeholder: 'Mediterranean, Middle East, worldwide...'
			},
			{
				name: 'buy_timeline',
				label: 'Purchase timeline',
				type: 'text',
				placeholder: 'Immediately, within six months...'
			},
			{
				name: 'buy_comments',
				label: 'Additional comments',
				type: 'textarea',
				full: true,
				optional: true,
				placeholder:
					'Share preferred builders, must-have features, speed, range or any specific requirements.'
			}
		]
	}
};
