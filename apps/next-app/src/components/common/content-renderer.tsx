import React, { FC } from 'react';
import HtmlReactParser, { Element, HTMLReactParserOptions } from 'html-react-parser';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import MediaEmbed, { MediaEmbedProps } from './shortcodes/media-embed';

export const AUDIO_REGEX =
  /<figure class="media">\s*<oembed\s+url="([^"]+\.(mp3|ogg|wav))">\s*<\/oembed>\s*<\/figure>/g;
export const VIDEO_REGEX = /<figure class="media">\s*<oembed\s+url="([^"]+\.(mp4|avi))">\s*<\/oembed>\s*<\/figure>/g;

type ContentRendererProps = {
  data: string;
} & ComponentBaseProps;

const ContentRenderer: FC<ContentRendererProps> = ({ data }) => {
  const replaceMediaEmbedToHtml = (content?: string) => {
    if (!content) return '';

    const replacedHtml = content
      .replaceAll(AUDIO_REGEX, '<MediaEmbed url="$1" type="audio"></MediaEmbed>')
      .replaceAll(VIDEO_REGEX, '<MediaEmbed url="$1" type="video"></MediaEmbed>');

    const options: HTMLReactParserOptions = {
      replace: node => {
        if (node instanceof Element && node.attribs) {
          if (node.name === 'mediaembed') {
            const attribs = node.attribs as MediaEmbedProps;

            return <MediaEmbed url={attribs.url} type={attribs.type} />;
          }
        }
      }
    };

    return HtmlReactParser(replacedHtml, options);
  };

  return replaceMediaEmbedToHtml(data);
};

export default ContentRenderer;
