package com.hmsws.util;

import java.io.File;
import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.json.JSONArray;
import org.json.JSONObject;

//import com.atultest.domain.Tblsequence;



 
public class QuickUtil {

	public static String[] modules={"City","State","Golf Clubs","Golf Courses","Score Card","GPS Marker Master","GPS Lati Longi","Advertisement"};

	public static String ImagePath = File.separator + "HMSWSFiles"
			+ File.separator;
	
	public QuickUtil() {
		// TODO Auto-generated constructor stub
	}

	public static String saveToNew(Object mobj) {
		Session session = HibernateUtils.currentSession();
		Transaction tx = null;
		boolean rollback = true;
		try {
			tx = session.beginTransaction();
			Serializable save = session.save(mobj);

			tx.commit();
			rollback = false;
			return save.toString();
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("saveToNew Failed for "	+ mobj.getClass()+ e.getCause());
		} finally {
			if (rollback && tx != null) {
				tx.rollback();
			}
			HibernateUtils.closeSession();
		}
		return "";
	}

	public static void updateToOld(Object mobj) {
		Session session = HibernateUtils.currentSession();
		Transaction tx = null;
		boolean rollback = true;
		try {
			tx = session.beginTransaction();
			session.update(mobj);

			tx.commit();
			rollback = false;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rollback && tx != null) {
				tx.rollback();
			}
			HibernateUtils.closeSession();
		}
	}

	public static int deleteFromDB(String tablename, String whereclause) {
		Session session = HibernateUtils.currentSession();
		Transaction tx = null;
		int ret = 0;
		boolean rollback = true;
		try {
			tx = session.beginTransaction();
			Query createQuery = session.createQuery("delete from " + tablename
					+ " where " + whereclause);
			ret = createQuery.executeUpdate();
			System.out.println("Mith Rows Deleted:" + ret);
			tx.commit();
			rollback = false;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rollback && tx != null) {
				tx.rollback();
			}
			HibernateUtils.closeSession();

		}
		return ret;
	}
	
	/*	public static <T> List retrieveALL(T a, String tablename, String columnames) {
		Session session = HibernateUtils.currentSession();
		try {
			Query query = session.createQuery("SELECT   " + columnames
					+ " FROM " + tablename + " a");

			// +" WHERE u_username='" + U_UserName +
			// "' AND u_pass='"+U_Pass+"'");
			List<T> dataList = query.list();
			return dataList;

		} catch (Exception e) {
			System.out.println("checklogin method error:" + e.getMessage());
			e.printStackTrace();
		} finally {

			HibernateUtils.closeSession();
		}
		return null;
	}
*/
	public static <T> List retrieveALLwithHB(T a, String tablename,
			String columnames) {
		Session session = HibernateUtils.currentSession();
		try {
			Query query = session.createQuery("from  " + tablename + " a");

			// +" WHERE u_username='" + U_UserName +
			// "' AND u_pass='"+U_Pass+"'");
			List<T> dataList = query.list();
			return dataList;

		} catch (Exception e) {
			System.out.println("retieveALlwithHB method error:"
					+ e.getMessage());
			e.printStackTrace();
		} finally {

			HibernateUtils.closeSession();
		}
		return null;
	}

	public static <T> List retrieveWherClause(T a, String tablename,
			String whereclause) {
		Session session = HibernateUtils.currentSession();
		try {
			// Query query = session.createQuery("SELECT   "+columnames
			// + " FROM "+tablename+" a" +" "+whereclause);

			// +" WHERE u_username='" + U_UserName +
			// "' AND u_pass='"+U_Pass+"'");
			Query query = session.createQuery("from " + tablename + " where "
					+ whereclause);
			List<T> dataList = query.list();
			return dataList;

		} catch (Exception e) {
			System.out.println("checklogin method error:" + e.getMessage());
			e.printStackTrace();
		} finally {

			HibernateUtils.closeSession();
		}
		return null;
	}
	
	public static <T> List retrieveWherClauseWithCriteria(String[] columnames,T a, String tablename,
			Criterion[] whereclause) {
		Session session = HibernateUtils.currentSession();
		try {

			ProjectionList projectionList = Projections.projectionList();
			if(columnames!=null)
			{
				for(int i=0;i<columnames.length;i++)
				{
					projectionList.add(Projections.property(columnames[i]));
//					projectionList.add(proj);
				}
			}
			
			
			//			Query query = session.createQuery("from " + tablename + " where "
//					+ whereclause);
			System.out.println("Class name is="+a.getClass());
			Criteria setProjection = session.createCriteria(a.getClass()).setProjection(projectionList);
			for(int j=0;j<whereclause.length;j++)
			{
				setProjection.add(whereclause[j]);
			}
			List<T> dataList = setProjection.list();
			return dataList;

		} catch (Exception e) {
			System.out.println("checklogin method error:" + e.getMessage());
			e.printStackTrace();
		} finally {

			HibernateUtils.closeSession();
		}
		return null;
	}

	public static <T> List retrieveDistinctWhereClause(T a, String tablename,String[] columns,String whereclause )
	{
		Session session = HibernateUtils.currentSession();
		System.out.println("QuickUtil.retrieveDistinctWhereClause()");
		try {
			
			String distinctcolumn="";
			if(columns.length>0)
			{
				for(int i=0;i<columns.length;i++)
				{
					distinctcolumn+="a."+columns[i];
					if((i+1)==columns.length)
					{
						
					}
					else
					{
						distinctcolumn+=" , ";
					}
					
				}
			}
			
			String query="SELECT DISTINCT "+distinctcolumn+" FROM "+tablename+" a ";
			if((whereclause.trim()).isEmpty()==false)
			{
				query+="WHERE "+whereclause;
			}
			Query createQuery = session.createQuery(query);
			 List<T> list = createQuery.list();
			 return list;
		} catch (Exception e) {
			System.err.println("error here mith : "+e.getMessage());
			e.printStackTrace();
		}
		finally
		{
			HibernateUtils.closeSession();
		}
		return null;
	}
	
	/**
	 * 
	 * Exceute Raw SQL Query
		 * String sql = "select {supplier.*} from Supplier supplier";
			SQLQuery query = session.createSQLQuery(sql);
			query.addEntity("supplier", Supplier.class);
			List results = query.list();
	 */
	public static <T> List CreateSQLQueryWithEntity(String sql,String aliasname,T obj)
	{
		Session session = HibernateUtils.currentSession();
		
		try{
			
			SQLQuery qx = session.createSQLQuery(sql);
			qx.addEntity(aliasname,obj.getClass());
			List<T> lstqry = qx.list();
			return lstqry;
			
		}catch(Exception ex1)
		{
			
			System.err.println("ErrorCreateSQLQuery:" + ex1.getMessage());
			ex1.printStackTrace();
			return null;
		}
		finally
		{
			HibernateUtils.closeSession();
		}
	}
	
	/*
	 * Exceute Raw SQL Query
	 */
	public static List CreateSQLQuery(String sql)
	{
		Session session = HibernateUtils.currentSession();
		
		try{
			
	
			Query qx = session.createSQLQuery(sql);
			List lstqry = qx.list();
			return lstqry;
			
		}catch(Exception ex1)
		{
			
			System.err.println("ErrorCreateSQLQuery:" + ex1.getMessage());
			return null;
		}
		finally
		{
			HibernateUtils.closeSession();
		}
	}
	/*
	 * Exceute Raw SQL Query whcih returns in HashMap
	 */
	public static List CreateSQLQueryHashMap(String sql)
	{
		Session session = HibernateUtils.currentSession();
		
		try{
			
			Query qx = session.createSQLQuery(sql);
			qx.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List lstqry = qx.list();
			return lstqry;
			
		}catch(Exception ex1)
		{
			
			System.err.println("ErrorCreateSQLQuery:" + ex1.getMessage());
			return null;
		}
		finally
		{
			HibernateUtils.closeSession();
		}
	}


	public static Integer doGetNextPKdate()
	{
		Date  abc=Calendar.getInstance().getTime();
		int a=(int) abc.getTime();
		return a;
	}

	public static Integer doGetNextPK(String tablename, String pkid) {
	
		if (tablename.isEmpty()) {
			Integer ret = new Random().nextInt(10000);
			return ret;
		} else {
			StringBuffer sqlQry = new StringBuffer();
			sqlQry.append(" SELECT  max(E." + pkid + ") from  " + tablename
					+ " E");
	
			try {
				Session session = HibernateUtils.currentSession();
				Query dashBrdQry = session.createQuery(sqlQry.toString());
	
				List dataList = dashBrdQry.list();
				System.out.println("size is" + dataList.size());
	
				if (dataList.get(0) == null) {
					return 1;
				}
				System.out.println("class is" + dataList.get(0).getClass()
						+ "valui is " + dataList.get(0));
				Integer a = 0;
	
				System.out.println("IS a string here");
				if (dataList.get(0).getClass().getName().indexOf("String") != -1) {
					String r = (String) dataList.get(0);
					a = Integer.parseInt(r);
				} else if (dataList.get(0).getClass().getName()
						.indexOf("Integer") != -1) {
					a = (Integer) dataList.get(0);
				}
				a++;
				System.out.println("Value is " + a);
				return a;
	
				// Integer ret=(Integer) dataList.get(0);
				// ret++;
	
				// return ret;
	
			} catch (Exception e) {
				System.out.println("dogetNextPK method has error "
						+ e.getMessage());
				e.printStackTrace();
			} finally {
	
				HibernateUtils.closeSession();
			}
		}
		return null;
	}

	/**
	 * retrieves a random number and checks if the new Primary Key is Not
	 * repeated.
	 * 
	 * @param tablename
	 * @param column
	 *            must be a integer type columnn
	 * @param b
	 *            is just for methodoverloading
	 * @return
	 */
	public static Integer doGetNextPK(String tablename, String column, boolean b) {
		boolean stop2 = false;
		Integer pk2 = 0;

		for (int i = 0; i < 100 && stop2 != true; i++) {
			pk2 = doGetNextPK("", "");
			if (tablename.length() == 0 || column.length() == 0) {
				System.out
						.println("doGetNextPK tablename is empty so returned random number");
				return pk2;
			}
			try {
				List abcd = retrieveWherClause(new Object(), tablename, column
						+ "=" + pk2);
				if (abcd.size() == 0) {
					System.out
							.println("doGetNextPK is a uniques number so returned random number");

					stop2 = true;
					return pk2;
				} else {
					System.out
							.println("doGetNextPK tablename is already existing");

				}

			} catch (Exception e) {
				// TODO Auto-generated catch block

				e.printStackTrace();
				break;
			}
		}
		System.out.println("doGetNextPK(3args) had an error");
		return pk2;
	}
//todo uncomment below code
//	public static  Integer doGetNextSequence(String tablename) 
//	{
//		List<Tblsequence> retrieveWherClause = QuickUtil.retrieveWherClause(new Tblsequence(), "Tblsequence", "tablename='"+tablename+"' ");
//		if(retrieveWherClause.size()>0)
//		{
//			Tblsequence t = retrieveWherClause.get(0);
//			Integer nextsequenceno = t.getNextsequenceno();
//			++nextsequenceno;
//			System.out.println("New sequence id is "+nextsequenceno);
//			t.setNextsequenceno(nextsequenceno);
//			QuickUtil.updateToOld(t);
//			System.out.println("Update sequence id.");
//			return nextsequenceno;
//		}
//		return 1;
//	
//	}
	
	/*
	 * To check if the string field exists in the that table
	 */
	public static <T> Boolean doCheckIfRepeat(T obj,String tablename,String columnname,Object value2)
	{
		
		List retrieveWherClause = QuickUtil.retrieveWherClause(obj, tablename, columnname+"='"+value2+"' ");
		
		if(retrieveWherClause.size()>0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

//	public static Object callprocforjson(final String proccommand,final Object [] inputvalues) throws SQLException{
//		System.out.println("CommonUtil.callprocforjson()");
//		Connection connection=null;
//		CallableStatement callableStatement=null;  
//		try {
//			connection=HibernateUtils.currentSession().connection();
////			connection=myconnection();
//			callableStatement= connection.prepareCall(proccommand);
//			
//			for (int i = 0; i < inputvalues.length; i++) {
//				Object object = inputvalues[i];
//				callableStatement.setObject(i+1, object);
//				
//			}
//			callableStatement.registerOutParameter(2, Types.VARCHAR);
//			int executeUpdate = callableStatement.executeUpdate();
//			
//			String string = callableStatement.getString(2);
//			System.out.println("JDBC PROC Result="+string);
//			return string;
//		} catch (Exception e) {
//			 e.printStackTrace();
//		}
//		finally{
//			if(callableStatement!=null){
//				callableStatement.close();
//			}
//			if(connection!=null){
//				connection.close();
//			}
//			
//		}
//		return null;
//	}
	
	/**
	 * 
	 * @param proccommand
	 * @param inputvalues
	 * @param types Types class eg:Types.VARCHAR
	 * @return
	 * @throws SQLException
	 */
	public static ArrayList callprocforoutputparamsV2(final String proccommand,final Object [] inputvalues,int[] types) throws SQLException{
		System.out.println("CommonUtil.callprocforoutputparamsV2()");
		Connection connection=null;
		CallableStatement callableStatement=null;  
		try {
			connection=HibernateUtils.currentSession().connection();
//			connection=myconnection();
			callableStatement= connection.prepareCall(proccommand);
			int column=0;
			for (int i = 0; i < inputvalues.length; i++) {
				Object object = inputvalues[i];
				if(object instanceof String){
					String t=object.toString();
					t=MyEscape.escape(t);
//					t=" QUOTE("+t+") ";
					callableStatement.setString(i+1, t);
				}
				else{
					callableStatement.setObject(i+1, object);
				}
				column=i+1;
			}
			column++;
			int outindex=column;
			for(int k=0;k<types.length;k++){
				callableStatement.registerOutParameter(column, types[k]);
				column++;
			}
			//callableStatement.registerOutParameter(2, Types.VARCHAR);
			int executeUpdate = callableStatement.executeUpdate();
			column=outindex;
			ArrayList result=new ArrayList();
			
			for(int k=0;k<types.length;k++){
				Object object = callableStatement.getObject(column);
				result.add(object);
				column++;
			}
//			String string = callableStatement.getString(2);
			System.out.println("JDBC PROC Result="+result);
			return result;
		} catch (Exception e) {
			 e.printStackTrace();
		}
		finally{
			HibernateUtils.closeSession();
			if(callableStatement!=null){
				callableStatement.close();
			}
			if(connection!=null){
				connection.close();
			}
			
		}
		return null;
	}
  
	public static JSONArray callprocforOutputwithoutparams( final String procname) throws SQLException{
		
		Connection connection=null;
		CallableStatement callableStatement=null;  
		try {
			connection=HibernateUtils.currentSession().connection();
//			connection=myconnection();
			callableStatement= connection.prepareCall(procname);

			ResultSet executeQuery = callableStatement.executeQuery();
			ResultSetMetaData metaData = executeQuery.getMetaData();
			int columnCount = metaData.getColumnCount();
			ArrayList arrayList = new ArrayList();
			JSONArray jsonArray = new JSONArray();
			while(executeQuery.next()){
				HashMap hashMap = new HashMap();
				JSONObject jsonObject = new JSONObject();
				for(int i=0;i<columnCount;i++){
					Object object = executeQuery.getObject(i+1);
					String columnName = metaData.getColumnName(i+1);
					hashMap.put(columnName, object);
					jsonObject.put(columnName, object);
				}
				arrayList.add(hashMap);
				jsonArray.put(jsonObject);
			}
//			callableStatement.getMoreResults();
//			return arrayList;
			return jsonArray;
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		finally{
			HibernateUtils.closeSession();
			if(callableStatement!=null){
				callableStatement.close();
			}
			if(connection!=null){
				connection.close();
			}
			
		}
		return null;
	}

	public static String getImagePathForWs(HttpServletRequest request,
			HttpServletResponse response, String folderName) {

		String serverPath = request.getServerName();
		System.out.println("serverPath : " + serverPath);
		int portNo = request.getServerPort();
		String serverPathAndPort = "http:" + "//" + serverPath + ":" + portNo
				+ "/";
		String ImgPath = serverPathAndPort + "HMSWSFiles/" + folderName
				+ "/";
		System.out.println("ImgPath : " + ImgPath);
		 
		return ImgPath;
	}

	public static String getImagePathForSaveWS(HttpServletRequest request,
			HttpServletResponse response, String folderName) {

		HttpSession session = request.getSession();
		String WEBAPP_NAME = request.getContextPath();
		WEBAPP_NAME = WEBAPP_NAME.replaceAll("/", "");
		// WEBAPP_NAME = "\\" + WEBAPP_NAME;
		WEBAPP_NAME = File.separator + WEBAPP_NAME;
		String ImagePathsave = session.getServletContext().getRealPath(
				ImagePath);
		String ImagePathsaveNew = ImagePathsave.substring(0,
				ImagePathsave.indexOf(WEBAPP_NAME));
		// String
		// ImagePathsaveNew=ImagePathsave.replace("BillingWebApp/BillingWebAppReport","");
		String ImageSavePath = ImagePathsaveNew + ImagePath + folderName
				+ File.separator;// "\\"; // report_"+billId+".pdf";
		System.out.println("ImageSavePath : " + ImageSavePath);

		// done as on 28/01/2015 Implemented code to create folder if not exist
		File subfolder = new File(ImageSavePath);
		if (subfolder.exists() == false) {
			subfolder.mkdir();
		}

		return ImageSavePath;
	}
	
	
}
