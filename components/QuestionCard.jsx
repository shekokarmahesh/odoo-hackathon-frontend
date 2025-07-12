

const QuestionCard = ({
  title,
  description,
  tags,
  userName,
  answerCount,
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:bg-question-hover transition-colors duration-200 cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Question Title */}
          <h3 className="text-lg font-medium text-foreground mb-2 hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Question Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags and User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-tag-bg text-tag-text border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">{userName}</div>
          </div>
        </div>

        {/* Answer Count */}
        <div className="ml-6 flex-shrink-0">
          <div className="bg-accent border border-border rounded-md px-3 py-1 text-center min-w-[60px]">
            <div className="text-sm font-medium text-answer">
              {answerCount} ans
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
