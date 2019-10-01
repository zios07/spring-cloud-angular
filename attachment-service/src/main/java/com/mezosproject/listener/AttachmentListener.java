package com.mezosproject.listener;

import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Component;

@Component
public class AttachmentListener {

	@StreamListener(target = "AttachmentBinding")
	public void listenToPersonMessages(String message) {
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		System.out.println("Received new Attachment  : {0} " + message);
	}

}
