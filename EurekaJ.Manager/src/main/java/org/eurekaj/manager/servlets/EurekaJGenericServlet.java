/**
    EurekaJ Profiler - http://eurekaj.haagen.name
    
    Copyright (C) 2010-2011 Joachim Haagen Skeie

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
package org.eurekaj.manager.servlets;

import org.apache.log4j.Logger;
import org.eurekaj.manager.json.BuildJsonObjectsUtil;
import org.eurekaj.manager.service.AdministrationService;
import org.eurekaj.manager.service.TreeMenuService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by IntelliJ IDEA.
 * User: joahaa
 * Date: 1/20/11
 * Time: 9:34 AM
 * To change this template use File | Settings | File Templates.
 */
public class EurekaJGenericServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(EurekaJGenericServlet.class);
	
    private TreeMenuService berkeleyTreeMenuService;
    private AdministrationService administrationService;

    public AdministrationService getAdministrationService() {
        if (administrationService == null) {
            administrationService = (AdministrationService) WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("administrationService");
        }
        return administrationService;
    }

    public TreeMenuService getBerkeleyTreeMenuService() {
        if (berkeleyTreeMenuService == null) {
            berkeleyTreeMenuService = (TreeMenuService) WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("treeMenuService");
        }
        return berkeleyTreeMenuService;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String jsonResponse = "";

        try {
            JSONObject jsonObject = BuildJsonObjectsUtil.extractRequestJSONContents(request);
            log.debug("Accepted JSON: \n" + jsonObject);
        }  catch (JSONException jsonException) {
            throw new IOException("Unable to process JSON Request", jsonException);
        }

        PrintWriter writer = response.getWriter();
        if (jsonResponse.length() <= 2) {
            jsonResponse = "{}";
        }
        writer.write(jsonResponse);
        response.flushBuffer();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
