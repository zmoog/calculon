import { injectable, inject } from "inversify";
import { Intent, SlackMessage } from "dickbott";
import { random } from "lodash";


@injectable()
export class OshoIntent implements Intent<OshoEntities, SlackMessage> {

    name = "Osho Intent";
    description = "Le più belle frasi di Osho"
    docs_url = "https://bitbucket.tierraservice.com/projects/BLIZ/repos/blizzard-dickbott/browse/service/docs/OshoIntent.md"
    examples = {
        Simple: "Osho?",
        Elegant: "What Osho would say in this situation?"
    }

    constructor(@inject("OshoConfig") private config: OshoConfig) { }

    async execute(executionId: string, entities: OshoEntities): Promise<SlackMessage> {
        let phrase = this.randomPhrase();
        let message = {
            attachments: [
                {
                    author_name: 'Osho',
                    title: "Le più belle frasi di Osho",
                    text: phrase.text,
                    color: '#d2dde1',
                    image_url: phrase.image_url,
                    mrkdwn_in: [
                        'text',
                        'pretext',
                        'fields'
                    ],
                    attachment_type: 'default'
                }
            ]
        };
        console.log("message: %j", message);
        return message;
    }

    randomPhrase(): Phrase {
        if (!this.config.phrases) {
            return {
                text: "Ciò che non ti uccide ti rompe li cojoni",
                image_url: "https://i.ytimg.com/vi/XW1UhpJV_sQ/maxresdefault.jpg"
            };
        }
        return this.config.phrases[random(this.config.phrases.length - 1)];
    }
}

export class OshoEntities { }

export interface OshoConfig {
    phrases: Phrase[]
}

export interface Phrase {
    text: string
    image_url: string,
    tags?: string[]
}
