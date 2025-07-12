"use client";
import Header from "@/components/Header";
import React, { useRef, useState } from "react";

const PostQuestionPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "", // This will be handled by your rich text editor
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();

  const handleContentChange = (text) => {
    console.log("Editor content:", text);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  // Add tag
  // Add tag
  const addTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setCurrentTag("");
      // Clear tag error when a tag is successfully added
      if (errors.tags) {
        setErrors((prev) => ({
          ...prev,
          tags: "",
        }));
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Question submitted:", formData);
      alert("Question posted successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        tags: [],
      });
      setCurrentTag("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tag input changes and clear tag errors
  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
    // Clear tag error when user starts typing in tag input
    if (errors.tags) {
      setErrors((prev) => ({
        ...prev,
        tags: "",
      }));
    }
  };

  // Handle description changes (for your rich text editor)
  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
    // Clear description error when user starts typing
    if (errors.description) {
      setErrors((prev) => ({
        ...prev,
        description: "",
      }));
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <div className="min-h-screen bg-base-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Ask a Question
            </h1>
            <p className="text-base-content/70">
              Get help from the community by asking a detailed question
            </p>
          </div>

          {/* Main Form Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text text-lg font-semibold">
                      Title
                    </span>
                    <span className="label-text-alt text-base-content/50">
                      {formData.title.length}/150
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a descriptive title for your question"
                    maxLength={150}
                    className={`input input-bordered w-full text-lg ${
                      errors.title ? "input-error" : ""
                    }`}
                  />
                  {errors.title && (
                    <label className="label mb-2">
                      <span className="label-text-alt text-error">
                        {errors.title}
                      </span>
                    </label>
                  )}
                </div>

                {/* Description Field - Rich Text Editor Space */}
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text text-lg font-semibold">
                      Description
                    </span>
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your question in detail. Include what you've tried, what you expected to happen, and what actually happened."
                    rows={8}
                    className={`textarea textarea-bordered w-full resize-y ${
                      errors.description ? "textarea-error" : ""
                    }`}
                  />

                  {errors.description && (
                    <label className="label mb-2">
                      <span className="label-text-alt text-error">
                        {errors.description}
                      </span>
                    </label>
                  )}
                </div>

                {/* Tags Field */}
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text text-lg font-semibold">
                      Add Tags
                    </span>
                  </label>

                  {/* Tag Input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInput}
                      placeholder="Add tags (press Enter or comma to add)"
                      className="input input-bordered flex-1"
                      disabled={formData.tags.length >= 5}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!currentTag.trim() || formData.tags.length >= 5}
                      className="btn btn-outline btn-primary"
                    >
                      Add
                    </button>
                  </div>

                  {/* Display Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="badge badge-primary badge-lg gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-primary-content hover:text-primary-content/70"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-4 h-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {errors.tags && (
                    <label className="label mb-2">
                      <span className="label-text-alt text-error">
                        {errors.tags}
                      </span>
                    </label>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn btn-primary flex-1 sm:flex-none sm:px-8 ${
                      isLoading ? "loading" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Posting...
                      </>
                    ) : (
                      "Post Question"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline flex-1 sm:flex-none sm:px-8"
                    onClick={() => {
                      setFormData({ title: "", description: "", tags: [] });
                      setCurrentTag("");
                      setErrors({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostQuestionPage;
