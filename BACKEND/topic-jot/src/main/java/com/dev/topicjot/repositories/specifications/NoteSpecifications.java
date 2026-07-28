package com.dev.topicjot.repositories.specifications;

import com.dev.topicjot.models.Note;
import org.springframework.data.jpa.domain.Specification;

public class NoteSpecifications {
    public static Specification<Note> hasTopicId(long topicId) {
        return (root, query, cb) -> cb.equal(root.get("topic").get("id"), topicId);
    }
    public static Specification<Note> hasErased() {
        return (root, query, cb) -> cb.isTrue(root.get("erased"));
    }

    public static Specification<Note> hasFavorite(Boolean favorite) {
        return (root, query, cb) -> Boolean.TRUE.equals(favorite) ? cb.isTrue(root.get("favorite")) : null;
    }
}
