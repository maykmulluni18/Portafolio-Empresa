import React, { createContext, useContext, useEffect, useState } from 'react';
import { companyService, portfolioService, testimonialService } from '../api/services';
import api from '../api/axios';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [company, setCompany]         = useState(null);
  const [services, setServices]       = useState([]);
  const [portfolio, setPortfolio]     = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam]               = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.allSettled([
      companyService.getAll(),
      api.get('/services'),
      portfolioService.getAll(),
      testimonialService.getAll(),
      api.get('/technologies'),
    ]).then(([cos, svs, pfs, tms, ths]) => {
      const companies = cos.value?.data ?? [];
      const first = companies[0] ?? null;
      setCompany(first);

      if (first) {
        setTeam(first.users ?? []);
      }

      setServices(svs.value?.data ?? []);
      setPortfolio(pfs.value?.data ?? []);
      setTestimonials(tms.value?.data ?? []);
      setTechnologies(ths.value?.data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <SiteContext.Provider value={{ company, services, portfolio, testimonials, team, technologies, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
