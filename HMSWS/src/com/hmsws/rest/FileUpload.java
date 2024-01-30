package com.hmsws.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.hmsws.util.QuickUtil;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.BodyPartEntity;
import com.sun.jersey.multipart.FormDataBodyPart;
import com.sun.jersey.multipart.FormDataParam;

@Path("/fileupload")
public class FileUpload {

	/**
	* This is the method of rest to be called from primeng code for fileupload
	* REM the fileupload componment using has the name="files"  in syntax 
	* @param bodyParts
	* @param fileDispositions
	* @return
	*/
	@Path("multiplefiles")
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFiles2(@FormDataParam("files") List<FormDataBodyPart> bodyParts,
			@FormDataParam("files") FormDataContentDisposition fileDispositions,
			@Context HttpServletRequest request,@Context HttpServletResponse response) {

		StringBuffer fileDetails = new StringBuffer("");
		
		String imagePathForSaveWS = QuickUtil.getImagePathForSaveWS(request, response, "temp");

		/* Save multiple files */

		for (int i = 0; i < bodyParts.size(); i++) {
			/*
			* Casting FormDataBodyPart to BodyPartEntity, which can give us
			* InputStream for uploaded file
			*/
			BodyPartEntity bodyPartEntity = (BodyPartEntity) bodyParts.get(i).getEntity();
			String fileName = bodyParts.get(i).getContentDisposition().getFileName();

//			saveFile(bodyPartEntity.getInputStream(), fileName);
			String uploadedFileLocation = imagePathForSaveWS + fileName;
			writeToFile(bodyPartEntity.getInputStream(), uploadedFileLocation);
			fileDetails.append(" File saved at " + uploadedFileLocation);
		}
		return Response.status(200).entity(fileDetails.toString()).build();

	}
	

	// save uploaded file to new location
	private void writeToFile(InputStream uploadedInputStream,
		String uploadedFileLocation) {

		try {
			OutputStream out = new FileOutputStream(new File(
					uploadedFileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {

			e.printStackTrace();
		}

	}
}
