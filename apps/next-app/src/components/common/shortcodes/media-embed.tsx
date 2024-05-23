export type MediaEmbedProps = {
  url: string;
  type: string;
};

const MediaEmbed: React.FC<MediaEmbedProps> = ({ url, type }) => {
  return (
    <figure className="media">
      {type === 'audio' && (
        <p className="flex items-center justify-center">
          <audio controls src={url} />
        </p>
      )}
      {type === 'video' && <video controls className="w-full" src={url} />}
    </figure>
  );
};

export default MediaEmbed;
