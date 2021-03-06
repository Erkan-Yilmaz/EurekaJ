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
package org.eurekaj.manager.datatypes;

import org.eurekaj.api.datatypes.TreeMenuNode;

/**
 * Created by IntelliJ IDEA.
 * User: jhs
 * Date: 5/6/11
 * Time: 10:49 AM
 * To change this template use File | Settings | File Templates.
 */
public class ManagerTreeMenuNode implements TreeMenuNode {
    String guiPath;
	String nodeLive;

    public ManagerTreeMenuNode(String guiPath, String nodeLive) {
        this.guiPath = guiPath;
        this.nodeLive = nodeLive;
    }

    public ManagerTreeMenuNode() {
    }

    public ManagerTreeMenuNode(TreeMenuNode treeMenuNode) {
        this.guiPath = treeMenuNode.getGuiPath();
        this.nodeLive = treeMenuNode.getNodeLive();
    }

    public String getGuiPath() {
        return guiPath;
    }

    public void setGuiPath(String guiPath) {
        this.guiPath = guiPath;
    }

    public String getNodeLive() {
        return nodeLive;
    }

    public void setNodeLive(String nodeLive) {
        this.nodeLive = nodeLive;
    }

    @Override
    public int compareTo(TreeMenuNode other) {
		if (other == null || other.getGuiPath() == null) {
			return 1;
		}

		if (this.getGuiPath() == null) {
			return -1;
		}

		return this.getGuiPath().compareTo(other.getGuiPath());
	}
}
