package Main.Service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;
import jakarta.annotation.PostConstruct;
import Main.Entity.EmailRequest;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
@Service
public class EmailGeneratorService {
	
	
	@Autowired
	private WebClient webClient;
	
	@Value("${gemini.api.url}")
	private String geminiApiUrl;
	@Value("${gemini.api.key}")
	private String geminiApiKey;
	
	
	private  String geminiUrl;
    private  String geminiKey;

    public EmailGeneratorService(
            @Value("${gemini.api.url}") String geminiUrl,
            @Value("${gemini.api.key}") String geminiKey) {
        this.geminiUrl = geminiUrl;
        this.geminiKey = geminiKey;
    }
    
	public String generateEmailReply(EmailRequest request)
	{
		String finalUrl = geminiUrl + "?key=" + geminiKey;

		
		
		String prompt=BuildPrompt(request);
		Map<String,Object> requestBodyMap=Map.of(
				"contents",new Object[] {
						Map.of("parts",new Object[]
								{
										Map.of("text",prompt)
								})
				});
		
		
		
		String response= webClient.post()
				.uri(finalUrl)
				.header("Content-Type", "application/json")
				.bodyValue(requestBodyMap)
				.retrieve()
				.bodyToMono(String.class)
				.block();
		
		
		return ExtractingResponse(response);
	}

	private String ExtractingResponse(String response) {
		try {
			
			ObjectMapper mapper=new ObjectMapper();
			JsonNode rootNode=mapper.readTree(response);
			
			return rootNode.path("candidates")
					.get(0)
					.path("content")
					.path("parts")
					.get(0)
					.path("text")
					.asText();
			
		} catch (Exception e) {
				return "errorprocessing request:"+ e.getMessage();
		}
	}

	private String BuildPrompt(EmailRequest request) {
		StringBuilder prompt=new StringBuilder();
		
		if(request.getTone()!=null && !request.getTone().isEmpty())
		{
			prompt.append("use a ").append(request.getTone()).append("tone.");
		}
		prompt.append("\n original email: \n").append(request.getEmailContent());
		
		return prompt.toString();
	}
	
	@PostConstruct
	public void check() {
	    System.out.println("URL = " + System.getenv("GEMINI_URL"));
	    System.out.println("KEY = " + System.getenv("GEMINI_KEY"));
	}
}
