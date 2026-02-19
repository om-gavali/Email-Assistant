package Main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Main.Entity.EmailRequest;
import Main.Service.EmailGeneratorService;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailControllerGeneratoe {

	@Autowired
	private EmailGeneratorService service;
	
	@PostMapping("/generate")
	public ResponseEntity<String> generateEmail(@RequestBody EmailRequest email)
	{
		String responseString=service.generateEmailReply(email);
		return ResponseEntity.ok(responseString);
		
	}
	
}
