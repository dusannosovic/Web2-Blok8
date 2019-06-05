﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class PolasciController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;
        public PolasciController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
        // GET: api/Polasci
        public IEnumerable<PolazakBinding> GetPolasci(string linija,string dan)
        {
            List<PolazakBinding> linijas = new List<PolazakBinding>();
            foreach (Polasci lin in _unitOfWork.Polascis.GetAll())
            {
                foreach (Linija li in lin.Linijas)
                {
                    if (li.OznakaLinije == linija&&lin.Dan.ToString()==dan)
                    {
                        linijas.Add(new PolazakBinding() { Dan = lin.Dan, VremePolaska = lin.VremePolaska.ToString() });
                    }
                }
                    //linijas.Add(new PolazakBinding() { Dan = lin.Dan,VremePolaska = lin.VremePolaska.ToString() });
            }
            //return _unitOfWork.Linijas.GetAll();
            return linijas.AsEnumerable();
        }
        public IEnumerable<PolazakBinding> GetPolazakByLin(string linija)
        {
            bool check = false;
            List<PolazakBinding> linijas = new List<PolazakBinding>();
            foreach (Polasci lin in _unitOfWork.Polascis.GetAll())
            {
                check = false;
                foreach (Linija li in lin.Linijas)
                {
                    if (li.OznakaLinije == linija)
                    {
                        check = true;
                    }
                }
                if(!check)
                    linijas.Add(new PolazakBinding() { Dan = lin.Dan,VremePolaska = lin.VremePolaska.ToString() });
            }
            //return _unitOfWork.Linijas.GetAll();
            return linijas.AsEnumerable();
        }

        // GET: api/Polasci/5
        /*public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Polasci
        public IHttpActionResult PostPolasci()
        {
            var req = HttpContext.Current.Request;
            var polazak = new Polasci() { Dan = Dan.RadniDan, VremePolaska = new  TimeSpan(16,30,00), };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _unitOfWork.Polascis.Add(polazak);
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = polazak.Id }, polazak);

        }

        // PUT: api/Polasci/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Polasci/5
        public void Delete(int id)
        {
        }
    }
}
