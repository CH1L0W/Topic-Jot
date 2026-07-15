package com.dev.topicjot.repositories.specifications;

import com.dev.topicjot.models.Topic;
import org.springframework.data.jpa.domain.Specification;

//Where conditions
public class TopicSpecifications {
    public static Specification<Topic> hasUserId(long userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }
    public static Specification<Topic> hasErased(Boolean erased) {
        return (root, query, cb) -> Boolean.TRUE.equals(erased) ? cb.isTrue(root.get("erased")) : cb.isFalse(root.get("erased"));
    }

    public static Specification<Topic> hasFavorite(Boolean favorite) {
        return (root, query, cb) -> Boolean.TRUE.equals(favorite) ? cb.isTrue(root.get("favorite")) : null;
    }

}
