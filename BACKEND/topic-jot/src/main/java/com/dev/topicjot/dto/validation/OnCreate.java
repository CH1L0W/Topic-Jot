package com.dev.topicjot.dto.validation;

/**
 * Validation group for constraints that only apply when a resource is being created,
 * not when it is updated (e.g. a Note's topicId, which is immutable after creation).
 */
public interface OnCreate {
}
