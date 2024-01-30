package com.hmsws.rest;

import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.hmsws.util.QuickUtil;

@Path("/login")
public class Login {
	/*
	 * as done on 21 dec 2016 by Mandar
	 * 
	 * login validation
	 */
	@POST
	@Path("WS_proc_member_login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response wS_proc_member_login(
			@FormParam("username") String username,
			@FormParam("password") String password) {
		System.out.println("MyApp.wS_proc_member_login()" + username
				+ " passworc :" + username);

		String proccommand = "CALL proc_member_login(?,?,?)";
		// String proccommand="CALL proc_tbl_product_master_editselect('BUS1')";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { username, password };
		String createSQLQuery;
		String output = "";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("proc_member_login Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);

					// String object = (String)
					// callprocforoutputparamsV2.get(0);
				}

				// if (callprocforoutputparamsV2.get(2) != null){
				// output=(String) callprocforoutputparamsV2.get(2);
				// System.out.println("MyApp.insertMilestonesProject() 2 :" +
				// output);
				// }
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("MyApp.wS_proc_member_login()" + output);
		return Response.status(200).entity(output).build();
	}

	/**
	 * http://localhost:8080/OFCAdmin/rest/login/
	 * WS_proc_tbl_member_rights_details_create inparam= memberid=
	 * 
	 * @param inparam
	 * @param memberid
	 * @return
	 */
	@POST
	@Path("WS_proc_tbl_member_rights_details_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response wS_proc_tbl_member_rights_details_create(
			@FormParam("inparam") String inparam,
			@FormParam("memberid") String memberid) {
		System.out.println("MyApp.wS_proc_tbl_member_rights_details_create()"
				+ inparam + " memberid :" + memberid);

		String proccommand = "CALL proc_tbl_member_rights_details_create(?,?,?)";
		// String proccommand="CALL proc_tbl_product_master_editselect('BUS1')";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { inparam, memberid };
		String createSQLQuery;
		String output = "";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("proc_tbl_member_rights_details_create Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);

					// String object = (String)
					// callprocforoutputparamsV2.get(0);
				}

				// if (callprocforoutputparamsV2.get(2) != null){
				// output=(String) callprocforoutputparamsV2.get(2);
				// System.out.println("MyApp.insertMilestonesProject() 2 :" +
				// output);
				// }
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("MyApp.wS_proc_tbl_member_rights_details_create()"
				+ output);
		return Response.status(200).entity(output).build();
	}

	/**
	 * http://localhost:8080/OFCAdmin/rest/login/
	 * WS_proc_tbl_member_rights_details_selectjson inparam= memberid=
	 * 
	 * @param inparam
	 * @param memberid
	 * @return
	 */
	@POST
	@Path("WS_proc_tbl_member_rights_details_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response wS_proc_tbl_member_rights_details_selectjson(
			@FormParam("memberid") String memberid) {
		System.out
				.println("MyApp.wS_proc_tbl_member_rights_details_selectjson()"
						+ " memberid :" + memberid);

		String proccommand = "CALL proc_tbl_member_rights_details_selectjson(?,?)";
		// String proccommand="CALL proc_tbl_product_master_editselect('BUS1')";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { memberid };
		String createSQLQuery;
		String output = "";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("proc_tbl_member_rights_details_selectjson Result="
							+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);

					// String object = (String)
					// callprocforoutputparamsV2.get(0);
				}

				// if (callprocforoutputparamsV2.get(2) != null){
				// output=(String) callprocforoutputparamsV2.get(2);
				// System.out.println("MyApp.insertMilestonesProject() 2 :" +
				// output);
				// }
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out
				.println("MyApp.wS_proc_tbl_member_rights_details_selectjson()"
						+ output);
		return Response.status(200).entity(output).build();
	}

	/**
	 * http://localhost:8080/OFCAdmin/rest/login/
	 * WS_proc_tbl_member_master_drpjson inparam= memberid=
	 * 
	 * @param inparam
	 * @param memberid
	 * @return
	 */
	@POST
	@Path("WS_proc_tbl_member_master_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response wS_proc_tbl_member_master_drpjson(
			@FormParam("input0") String input0) {
		System.out.println("MyApp.wS_proc_tbl_member_master_drpjson()");

		String proccommand = "CALL proc_tbl_member_master_drpjson(?,?)";
		// String proccommand="CALL proc_tbl_product_master_editselect('BUS1')";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = {};
		String createSQLQuery;
		String output = "";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("proc_tbl_member_master_drpjson Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);

					// String object = (String)
					// callprocforoutputparamsV2.get(0);
				}

				// if (callprocforoutputparamsV2.get(2) != null){
				// output=(String) callprocforoutputparamsV2.get(2);
				// System.out.println("MyApp.insertMilestonesProject() 2 :" +
				// output);
				// }
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out
				.println("MyApp.wS_proc_tbl_member_master_drpjson()" + output);
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_runningyear_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_runningyear_drpjson(@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_runningyear_drpjson()");
		String proccommand = "CALL proc_runningyear_drpjson(?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = {};
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_runningyear_drpjson Result="
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
