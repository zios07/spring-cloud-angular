package com.mezosproject.listener;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Component;

import com.mezosproject.model.Attachment;
import com.mezosproject.service.AttachmentService;

@Component
public class AttachmentListener {

	private static final Logger LOGGER = LoggerFactory.getLogger(AttachmentListener.class);
	private AttachmentService attachmentService;

	public AttachmentListener(AttachmentService attachmentService) {
		this.attachmentService = attachmentService;
	}

	@StreamListener(target = "AttachmentBinding")
	public void listenToPersonMessages(List<Attachment> attachments) {
		if (attachments != null && !attachments.isEmpty()) {
			LOGGER.info("Received attachment list of {} items", attachments.size());
			attachmentService.createAll(attachments);
			LOGGER.info("Persisted {} attachments", attachments.size());
		}
	}

}
