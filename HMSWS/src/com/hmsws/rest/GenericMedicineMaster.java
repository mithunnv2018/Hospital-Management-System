package com.hmsws.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;

import com.hmsws.util.QuickUtil;

@Path("/genericmedicinemaster")
public class GenericMedicineMaster {

	@POST
	@Path("WS_genericmedicine_excelsave")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_genericmedicine_excel(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_beds_create()" + input0);

		String uploadedFileLocation = QuickUtil.getImagePathForSaveWS(request,
				response, "temp");

		String uploadfile_actulalfilename = input0;
		String oldfile = uploadedFileLocation + uploadfile_actulalfilename;

		JSONArray data1 = new JSONArray();

		// import from excel sheet
		try {
			FileInputStream inputStream = new FileInputStream(new File(oldfile));

			Workbook workbook;

			workbook = new XSSFWorkbook(inputStream);
			Sheet firstSheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = firstSheet.iterator();

			while (iterator.hasNext()) {
				Row nextRow = iterator.next();
				// Iterator<Cell> cellIterator = nextRow.cellIterator();
				Cell cell = nextRow.getCell(0);
				String stringCellValue1 = cell.getStringCellValue();

				if(stringCellValue1==null || stringCellValue1.trim().isEmpty()){
					continue;
				}
				Cell cell2 = nextRow.getCell(1);
				String stringCellValue2 = cell2.getStringCellValue();

				Cell cell3 = nextRow.getCell(2);
				String stringCellValue3 = cell3.getStringCellValue();

				
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("GenericMedicinename", stringCellValue1);
				jsonObject.put("GenericGenericname", stringCellValue2);
				jsonObject.put("HospitalIdgenericmedicinemaster", input1);
				jsonObject.put("GenericChemicalIdgenericmedicinemaster",stringCellValue3);
				
				data1.put(jsonObject);

			}
			workbook.close();
			inputStream.close();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String realinput = data1.toString();
		System.out.println("IMPORT FROM EXCEL="+realinput);
		String proccommand = "CALL proc_genericmedicinemaster_createbulk(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { realinput };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_proc_genericmedicinemaster_createbulk Result="
							+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_genericmedicinemaster_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_genericmedicinemaster_create(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_genericmedicinemaster_create()" + input0);
		String proccommand = "CALL proc_genericmedicinemaster_create(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_genericmedicinemaster_create Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_genericmedicinemaster_update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_genericmedicinemaster_update(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_genericmedicinemaster_update()" + input0);
		String proccommand = "CALL proc_genericmedicinemaster_update(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_genericmedicinemaster_update Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_vwgenericmedicinechemicalmaster_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_vwgenericmedicinechemicalmaster_selectjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_vwgenericmedicinechemicalmaster_selectjson()");
		String proccommand = "CALL proc_vwgenericmedicinechemicalmaster_selectjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = {input0};
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_vwgenericmedicinechemicalmaster_selectjson Result="
							+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_genericmedicinemaster_selectedit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_genericmedicinemaster_selectedit(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_genericmedicinemaster_selectedit()"
				+ input0);
		String proccommand = "CALL proc_genericmedicinemaster_selectedit(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_genericmedicinemaster_selectedit Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
	
	@POST
	@Path("WS_genericchemicalmaster_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_genericchemicalmaster_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_genericchemicalmaster_drpjson()"
				+ input0);
		String proccommand = "CALL proc_genericchemicalmaster_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_genericchemicalmaster_drpjson Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_genericchemicalmaster_autocomplete_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_genericchemicalmaster_autocomplete_drpjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_genericchemicalmaster_autocomplete_drpjson()"
				+ input0);
		String proccommand = "CALL proc_genericchemicalmaster_autocomplete_drpjson(?,?,?,?)";
		int[] TYPES = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, TYPES);
			System.out
					.println("WS_ipdmaster_HospitalIdIPDMaster_SearchName_drpjson Result="
							+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
}
